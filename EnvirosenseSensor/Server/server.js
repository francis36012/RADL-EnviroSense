'use strict'
var net 	= require('net'),
	config	= require('../config.js'),
    util	= require('../util.js'),
    mysql	= require('mysql');

require('buffer');

var months = {Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'},
    sensorData = {type: null, id: 0, data: null, timeStamp: null},
    conn,
    tempConn,
    firstConnMade = false;

//***********DB FUNCTIONALITY***********//


function getSensors(){
    conn.query(config.DB.GET_LOCAL_SENSORS, function(err, result){
        if(err) {
            console.log('Query error: ', err);
            throw err;
        }

        //Loop through each data row
        result.forEach(function (row){
            console.log(row);
                config.THIS_PI.SENSORS_IDS[row['sensor_type']] = row['id'];
        });
        
        checkLocalDB();                        
        
    });
}


//Gets a new DB connection
function getNewConnection(recoveryDB){

	if(recoveryDB === 1){  //If 1 is passed as argument, local (Pi) DB connection is being attempted
        console.log('Attempting to use emergency (internal) DB');
		tempConn = mysql.createConnection({
			host	: config.DB.LOCALHOST,
			user	: config.DB.USERNAME,
			password: config.DB.PASSWORD,
			database: config.DB.DB_NAME,
			port	: config.DB.PORT 
		});
		
	} else {   //Main DB connection is being attempted
        console.log('Attempting to use standard (external) DB');
		tempConn = mysql.createConnection({
			host	: config.DB.HOST,
			user	: config.DB.USERNAME,
			password: config.DB.PASSWORD,
			database: config.DB.DB_NAME,
			port	: config.DB.PORT 
		});		
	}
    
	tempConn.connect(function(err){
		if(err){
			console.log('Database connection error: ',  err);
			if(!firstConnMade)   //If this error ocurred during first DB connection attempt, kill the process
				process.exit(1);
            console.log("Attempting reconnection to main DB");
            setTimeout(getNewConnection(), 2000);
		}
		else {
			console.log('Database connection successful!');
            conn = tempConn; 
            if(!firstConnMade){
                getSensors();
            }
			firstConnMade = true;			  
            if(recoveryDB === 1){
                console.log("Attempting reconnection to main DB");
                setTimeout(getNewConnection(), 2000);
            }
		}
	});

	tempConn.on('error', function(err){
		console.log('Database connection error: ', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			console.log('Database connection lost! Starting recovery DB');
			
			getNewConnection(1);			
			
		} else {
			throw err;
		}
	});
}

//****************CHECK LOCAL DB FUNCTION************
function checkLocalDB(){
    var c = mysql.createConnection({
			host	: config.DB.LOCALHOST,
			user	: config.DB.USERNAME,
			password: config.DB.PASSWORD,
			database: config.DB.DB_NAME,
			port	: config.DB.PORT 
		});
        
   c.connect(function(err){
		if(err){
			console.log('Database connection error: ',  err);
		}
		else {
			console.log('Local DB connection successful! (Checking for data)');
            config.THIS_PI.SENSOR_TABLES.forEach(function(sensor){
                c.query(util.sprintf(config.DB.GET_LOCAL_SENSOR_DATA, sensor), function(err, result){
                    if(err) {
                        console.log('Query error: ', err);
                        throw err;
                    }
                    if(result.length > 0){ //Data found for the first sensor
                        //Loop through each data row for the sensor
                        result.forEach(function (row){
                            console.log(row);
                            console.log(util.sprintf(config.DB.INSERT_SENSOR_DATA_SIMP, sensor, row['sensor_id'], row['data'], row['timestamp']));
                            conn.query(util.sprintf(config.DB.INSERT_SENSOR_DATA_SIMP, sensor, row['sensor_id'], row['data'], row['timestamp']), function(err){
                                if(err){
                                   console.log('Query error: ', err);
                                    throw err;
                                }
                                else{
                                    //Delete processed row from local DB table
                                    c.query(util.sprintf(config.DB.REMOVE_SENSOR_DATA, sensor, row['sensor_id'], row['timestamp']));
                                }
                            });
                        });                        
                    }
                });
            });
            console.log('Local DB scan finsished!');
		}
	});

	c.on('error', function(err){
		console.log('Database connection error: ', err);
		throw err;
	});     
}
//****************CHECK LOCAL DB FUNCTION END************

//***********DB FUNCTIONALITY END********//

var cServer = net.createServer(function(client) {
	console.log('Client connected ' + client.remoteAddress);

	client.on('end', function() {
		console.log('Client disconnected from server');
	});

	client.on('data', function(data){
		console.log(data.toString('ascii'));
		//Convert buffer to String to array of tokens

		var arrData = data.toString('ascii').replace("  ", " ").split(" ");

		var src = arrData[0];	//Gets the data sender


		//Data from Temperature/Motion sensor
		if(src == 'Temp/Hum'){
			//arrData[1]: Temperature (C)
			//arrData[2]: Humidity %
			//arrData[4]: Day (e.g. Sun)
			//arrData[5]: Month (e.g. Feb)
			//arrData[6]: Day (e.g. 7)
			//arrData[7]: Hour (e.g. 22:57:05)
			//arrData[8]: Year (e.g. 2016\n) //*** WATCH IT! \n AT THE END!

			//Tokenize time
			var arrTime = arrData[7].split(':');

			sensorData.type = 'temperature';
			sensorData.id = config.THIS_PI.SENSORS_IDS['TE'];
			sensorData.data = parseFloat(arrData[1]).toFixed(2);
			sensorData.timeStamp = arrData[8].substr(0,4) +	//Year
					' ' +  		
					months[arrData[5]] + 		 //Month
					' ' +
					util.zeroFill(arrData[6]) +	 //Day
					' ' +
					arrTime[0] + 			     //Hour
					' ' +
					arrTime[1] +			     //Minute
					' ' +
					arrTime[2];			         //Second 	
				console.log(sensorData);
				//Insert sensor data
			conn.query(util.sprintf(config.DB.INSERT_SENSOR_DATA, sensorData.type, sensorData.id, sensorData.data, sensorData.timeStamp), function(err){
				if(err){ 
					console.log('Error inserting data: ' + err);
					if(err == 'Error: Connection lost: The server closed the connection.')
						getNewConnection(1);
				}
				else	console.log('Data inserted');
			});
			
			sensorData.type = 'humidity';
			sensorData.id = config.THIS_PI.SENSORS_IDS['HU'];;
			sensorData.data = parseFloat(arrData[2]).toFixed(2);
            
			sensorData.timeStamp = arrData[8].substr(0,4) +  //Year 
					' ' +  		
					months[arrData[5]] +                     //Month
					' ' +
					util.zeroFill(arrData[6]) +	             //Day
					' ' +
					arrTime[0] + 			                 //Hour
					' ' + 
					arrTime[1] +			                 //Minute
					' ' +
					arrTime[2];			                     //Second 	
				console.log(sensorData);
				//Insert sensor data
			conn.query(util.sprintf(config.DB.INSERT_SENSOR_DATA, sensorData.type, sensorData.id, sensorData.data, sensorData.timeStamp), function(err){
				
				if(err){ 
					console.log('Error inserting data: ' + err);
					if(err == 'Error: Connection lost: The server closed the connection.')
						getNewConnection(1);
				}
				
				else	console.log('Data inserted');
			});
			}

		//Data from Motion sensor
		if(src == 'motion'){
			//arrData[1]: 'Y' or 'N'
			//From this point, only if 'Y'
			//arrData[2]: Hour
			//arrData[3]: Minute
			//arrData[4]: Second
			//arrData[5]: Day
			//arrData[6]: Month
			//arrData[7]: Year

			if(arrData[1] == 'Y'){
				sensorData.type = arrData[0];
				sensorData.id = config.THIS_PI.SENSORS_IDS['MO'];;
				sensorData.data = 1;
				sensorData.timeStamp = arrData[7] +	 //Year
							' ' +
							arrData[6] + 	         //Month
							' ' + 
							arrData[5] +	         //Day
							' ' +
							arrData[2] +	         //Hour
							' ' + 
							arrData[3] + 	         //Minute
							' ' +
							arrData[4];	             //Second
				console.log(sensorData);
				//Insert sensor data
				conn.query(util.sprintf(config.DB.INSERT_SENSOR_DATA, sensorData.type, sensorData.id, sensorData.data, sensorData.timeStamp), function(err){
					if(err){ 
						console.log('Error inserting data: ' + err);
						if(err == 'Error: Connection lost: The server closed the connection.')
							getNewConnection(1);
					}
					else	console.log('Data inserted');
				});
			}
		}

	});
	client.on('error', function(err){
		console.log(err);
	});
});


cServer.listen(config.netServer.PORT, function(){
	console.log('NODE.JS server bound on port', config.netServer.PORT);
    getNewConnection();
});


