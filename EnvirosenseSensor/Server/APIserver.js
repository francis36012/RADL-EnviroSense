'use strict'
var net 	    = require('net'),
	config	    = require('../config.js'),
    utilCustom	= require('../util.js'),
    util        = require('util'),
    mysql	    = require('mysql'),
    request     = require("request"),
    fs          = require('fs'),
    // log_file    = fs.createWriteStream('../debug.log', {flags : 'a'}),
    log_stdout  = process.stdout;
    
request = request.defaults({jar: true});
require('buffer');                 
               
var months = {Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'};
var conn;
var token;

/**
 * Writes error on log file and display error msg to console
 */
var errorLog = function(d) { 
    //.toLocaleDateString()
  fs.appendFile('debug.log', (new Date() + ' - ' + util.format(d) + '\n'), 'utf8', function(error){
      if(error)
        console.log(error);
  });
  log_stdout.write(util.format(d) + '\n');
};

process.on('uncaughtException', function(err){
	errorLog(err);
	errorLog(err.stack);
	process.exit(1);
})

/**
 * Deals with data coming from the HDC1000 sensor (Extract the humidity)
 */
var dealWithHum = function(arrData){ 
    parseHumData(arrData, function(humData){
        insertAPI(humData, function(error){
            if(error){
                errorLog(error);
                storeDataOnDB(humData, function(error){
                    if(error){
                        errorLog(error);
                    }
                });
            }
        });
    });   
};

/**
 * Deals with data coming from the HDC1000 sensor (Extract the temperature)
 */
var dealWithTemp = function(arrData){
    parseTempData(arrData, function(tempData){
        insertAPI(tempData, function(error){
            if(error){
                errorLog(error);
                storeDataOnDB(tempData, function(error){
                    if(error){
                        errorLog(error);
                    }
                });
            }
        });  
    });   
};

/**
 * Deals with data coming from the PIR Motion sensor
 */
var dealWithMot = function(arrData){
    parseMotionData(arrData, function(motionData){
        insertAPI(motionData, function(error){
            if(error){
                errorLog(error);
                storeDataOnDB(motionData, function(error){
                    if(error){
                        errorLog(error);
                    }
                });
            }
        })
    }); 
};

/**
 * Deals with data coming from the door sensor
 */
var dealWithDoor = function(arrData){
    parseDoorData(arrData, function(doorData){
        insertAPI(doorData, function(error){
            if(error){
                errorLog(error);
                storeDataOnDB(doorData, function(error){
                    if(error){
                        errorLog(error);
                    }
                });
            }
        })
    }); 
};

/**
 * net server that will listen for connections 
 */
var cServer = net.createServer(function(client) {
	console.log('Client connected');
	client.on('end', function() {
		console.log('Client disconnected from server');
	});

	client.on('data', function(data){
		console.log('Data received: ', data.toString('utf8')); 
		var arrData = data.toString('utf8').replace("  ", " ").split(" ");
        var port = arrData[0];
        
        //If port from data received is listed in config.js
        if(port in config.THIS_PI.PORT_SENSORID) {
            var src = arrData[1];    
            
            //Data from temp/hum sensor (HDC1000)
            if(src == 'Temp/Hum'){
                dealWithTemp(arrData);   
                dealWithHum(arrData);          
            }        

            //Data from PIR Motion sensor
            else if(src == 'motion'){
                dealWithMot(arrData);
            }
            
            //Data from door sensor
            else if(src == 'door'){
                dealWithDoor(arrData);
            }
        }
	});
    
	client.on('error', function(err){
		errorLog(err);
	});
});


/**
 * Insert a data set through the API
 */
function insertAPI (data, callback) {
    var arrDate = data['timeStamp'].split(' ');
    //timestamp: '2016-10-22T10:11:28.00Z', REFERENCE
    data['timeStamp'] = arrDate[0]+'-'+arrDate[1]+'-'+arrDate[2]+'T'+arrDate[3]+':'+arrDate[4]+':'+arrDate[5]+'.000Z';   	
	                     
    var options = { method: 'POST',
                    url: config.API.NEWDATA,
                    headers: {  'content-type': 'application/json',
                                'cache-control': 'no-cache',
                                'x-csrf-token': token }, 
                        body: [ {  sensorId: data['id'],
                                timestamp: data['timeStamp'],
                                data: data['data'],
                                sensorType: data['shortType'] } ],
                                json: true,
                                followAllRedirects: true,
                                timeout: 2000   
                   };                                                                        
    request(options, function (error, response, body) {
        if (error || response.statusCode != 200) {
            callback(new Error('Error inserting ' + data['type'] + ' data to API. Timestamp: ' + timeStamp));   
        }
        else{
        	console.log('API insert OK');
            callback();//Success
        } 
    });                
}


/**
 * Creates initial connection to local DB
 */
function getLocalDBConn(callback){
    conn = mysql.createConnection({
			host	: config.DB.LOCALHOST,
			user	: config.DB.USERNAME,
			password: config.DB.PASSWORD,
			database: config.DB.DB_NAME,
			port	: config.DB.PORT 
		});
            
    conn.connect(function(error){
        if(error) callback(new Error(error));
        callback();
            
    }); 
    
    conn.on('error', function(error){
        errorLog('Error with local DB connection. Error msg: ' + error);   
    });        
}

/**
 * Parse door data
 */
function parseDoorData(arrData, callback){       
    var doorData = {shortType: null, type: null, id: 0, data: null, timeStamp: null};
    var d = null;
    
    if(arrData[2] == 'closed')
        d = 0;
    else
        d = 1;    
        
    doorData.shortType = 'DR';
    doorData.type = 'door';
    doorData.id = config.THIS_PI.PORT_SENSORID[arrData[0]];
    doorData.data = d;
    doorData.timeStamp = arrData[8] +	 //Year
                ' ' +
                arrData[7] + 	         //Month
                ' ' + 
                arrData[6] +	         //Day
                ' ' +
                arrData[3] +	         //Hour
                ' ' + 
                arrData[4] + 	         //Minute
                ' ' +
                arrData[5];	             //Second
                          
    callback(doorData);        
}

/**
 * Parse motion data
 */
function parseMotionData(arrData, callback){       
    var motData = {shortType: null, type: null, id: 0, data: null, timeStamp: null};
	var d = null;
	
	if(arrData[2] == 'false')
		d = 0;
	else	
		d = 1;		
  
	motData.shortType = 'MO';
	motData.type = 'motion';
	motData.id = config.THIS_PI.PORT_SENSORID[arrData[0]];
	motData.data = d;
	motData.timeStamp = arrData[8] +	 //Year
				' ' +
				arrData[7] + 	         //Month
				' ' + 
				arrData[6] +	         //Day
				' ' +
				arrData[3] +	         //Hour
				' ' + 
				arrData[4] + 	         //Minute
				' ' +
				arrData[5];	             //Second
								
	callback(motData);        
    
}

/**
 * Parse temperature data
 */
function parseTempData(arrData, callback){      
    var ids = config.THIS_PI.PORT_SENSORID[arrData[0]].toString('utf8').split(',');
    var arrTime = arrData[8].split(':');
    var tempData = {shortType: null, type: null, id: 0, data: null, timeStamp: null};;
    tempData.shortType = 'TE';
    tempData.type = 'temperature';
    tempData.id = ids[0];
    tempData.data = parseFloat(arrData[2]).toFixed(2);
    tempData.timeStamp = arrData[9].substr(0,4) +	//Year
            ' ' +  		
            months[arrData[6]] + 		            //Month
            ' ' +
            utilCustom.zeroFill(arrData[7]) +	    //Day
            ' ' +
            arrTime[0] + 			                //Hour
            ' ' +
            arrTime[1] +			                //Minute
            ' ' +
            arrTime[2];			                    //Second 
            
    callback(tempData);
}

/**
 * Parse humidity data
 */
function parseHumData(arrData, callback){
    var ids = config.THIS_PI.PORT_SENSORID[arrData[0]].toString('utf8').split(',');
    var arrTime = arrData[8].split(':');
    var humData = {shortType: null, type: null, id: 0, data: null, timeStamp: null};;
    humData.shortType = 'HU';
    humData.type = 'humidity';
    humData.id = ids[1];
    humData.data = parseFloat(arrData[3]).toFixed(2);
    humData.timeStamp = arrData[9].substr(0,4) +     //Year 
            ' ' +  		
            months[arrData[6]] +                     //Month
            ' ' +
            utilCustom.zeroFill(arrData[7]) +	     //Day
            ' ' +
            arrTime[0] + 			                 //Hour
            ' ' + 
            arrTime[1] +			                 //Minute
            ' ' +
            arrTime[2];			                     //Second 	
                
    callback(humData);
}

/**
 * Attemtps a connection (login) to the API.
 */
function connectAPI(callback){
    var options = { method: 'GET',
                        url: config.API.LOGINPAGE,
                        headers: { 'cache-control': 'no-cache' },
                        followAllRedirects: true,
                        timeout: 3000
                    };
    request(options, function (error, response, body) {
        if (error || response.statusCode != 200) {
            callback(new Error('Error on the first API GET'));
        }
        else{
            var options = { method: 'POST',
                        url: config.API.LOGINPAGE,
                        headers: {  'content-type': 'application/x-www-form-urlencoded',
                                    'cache-control': 'no-cache',
                                    'x-csrf-token': response.headers['x-csrf-token'] 
                                },
                        form: { email: config.API.EMAIL, 
                                password: config.API.PASSWORD 
                            },
                                followAllRedirects: true                           
                    };
                                                                    
            request(options, function (error, response, body) {
                if (error || response.statusCode != 200) {
                    callback(new Error('Error on the API login attempt'));
                }
                else{      
                    token = response.headers['x-csrf-token'];
                    callback();//Success               
                }               
            });
        }
    });   
}

/**
 * Store data on local DB
 */
function storeDataOnDB(sensorData, callback){
    conn.query(utilCustom.sprintf(config.DB.INSERT_SENSOR_DATA, sensorData.type, sensorData.id, sensorData.data, sensorData.timeStamp), function(err){
        if(err){ 
            if(err.code === 'ER_DUP_ENTRY'){
            }//Ignore. Means duplicated data
            else {   
                errorLog('Error inserting' + sensorData.type + 'data to local DB. Error msg: ' + err);
            }                
        }
    });  
}

/**
 * Initial checking of local DB for data and store though API if found
 */
function checkLocalDB(callback){     
    console.log('Checking local DB for data saved previously...');            
    config.THIS_PI.SENSOR_TABLES.forEach(function(sensor){
        conn.query(utilCustom.sprintf(config.DB.GET_LOCAL_SENSOR_DATA, sensor), function(error, result){
            if(error) {
                callback(new Error('Error querying the local DB. Error msg: ' + error));   
            }
            else if(result.length > 0){
                result.forEach(function (row){
                    parseDataFromDB(sensor, row, function(data){ 
                        insertAPI(data, function(error){
                            if(error){
                                errorLog(error);
                            }
                            else{
                                conn.query(utilCustom.sprintf(config.DB.REMOVE_SENSOR_DATA, sensor, row['sensor_id'], row['timestamp']), function(error){
                                    if(error){
                                        callback(new Error('Error removing data from local DB. Error msg: ' + error));   
                                    }
                                });
                            }
                        });
                    });                            
                });                     
            }
            else{
                console.log('No data found for table',sensor);
            }
        });
    });   
    callback();
}

/**
 * Parse data retrieved from local DB
 */
function parseDataFromDB(sensor, row, callback){
    var data = {shortType: null, type: null, id: 0, data: null, timeStamp: null};;
    data.shortType = sensor.toString().substring(0,2).toUpperCase();
    data.type = sensor;
    data.id = row['sensor_id'];
    data.data = row['data'];
    var timestamp = row['timestamp'].toString('utf8').split(' ');
    var arrTime = timestamp[4].split(':');
    data.timeStamp = timestamp[3] + 
    ' ' +
    months[timestamp[1]] +
    ' ' +
    timestamp[2] +
    ' ' +
    arrTime[0] + 
    ' ' +
    arrTime[1] +
    ' ' +
    arrTime[2];	      
         
    callback(data);
}


/**
 * Start point of the server. 
 * 
 * TODO:-Try to regain the API connection once it is lost  
 * 		-Try to implement readings from multiple ports for the HDC1000   
 * 
 *          
 */
getLocalDBConn(function(error){
    if (error) {
        errorLog(error);
    }
    else{
        console.log('Local DB connection successful');
    } 
    connectAPI(function(error){
        if(error){
            errorLog(error);
        }
        else{
            console.log('API connection successful');
        }    
        checkLocalDB(function(error){
            if(error){
                errorLog(error);
            }   
        });
		cServer.listen(config.netServer.PORT, function(){                       
                console.log('NODE.JS server listening on port', config.netServer.PORT);                                
        }); 
    })              
});