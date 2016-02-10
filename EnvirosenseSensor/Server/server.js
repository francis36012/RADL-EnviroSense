var net 	= require('net'),
	config	= require('../config.js'),
    util	= require('../util.js'),
    mysql	= require('mysql');

require('buffer');

var months = {Jan: '01', Feb: '02', Mar: 03, Apr: 04, May: 05, Jun: 06, Jul: 07, Aug: 08, Sep: 09, Oct: 10, Nov: 11, Dec: 12};
var sensorData = {type: null, id: 0, data: 0, timeStamp: null};
var conn;


//*********************************** DATABASE CODE HERE
function getNewConnection(recoveryDB){

	if(recoveryDB === 1){
		conn = mysql.createConnection({
			host	: config.DB.LOCALHOST,
			user	: config.DB.USERNAME,
			password: config.DB.PASSWORD,
			database: config.DB.DB_NAME,
			port	: config.DB.PORT 
		});
		console.log('Attempting to use emergency (internal) DB');
	} else {
		conn = mysql.createConnection({
			host	: config.DB.HOST,
			user	: config.DB.USERNAME,
			password: config.DB.PASSWORD,
			database: config.DB.DB_NAME,
			port	: config.DB.PORT 
		});
		console.log('Attempting to use standard (external) DB');
	}
	conn.connect(function(err){
		if(err){
			console.log('Database connection error: ' + err);
			//setTimeout(getNewConnection, 1000);
		}
		else{
			console.log('Database connection successful!');
			//CHECK LOCAL DB FOR DATA BEFORE!!!!!!
		}
	});

	conn.on('error', function(err){
		console.log('Database erro: ', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			console.log('Database connection lost! Starting recovery DB');
			
			getNewConnection(1);

			//setTimeout(getNewConnection, 1000);

		} else {
			throw err;
		}
	});
}
//*********************************** DATABASE CODE HERE

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


		//Data from Temperature sensor
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
			sensorData.id = 123;
			sensorData.data = parseFloat(arrData[1]).toFixed(2);
			sensorData.timeStamp = arrData[8].substr(0,4) +	//Year
					' ' +  		
					months[arrData[5]] + 		//Month
					' ' +
					util.zeroFill(arrData[6]) +	//Day
					' ' +
					arrTime[0] + 			//Hour
					' ' +
					arrTime[1] +			//Minute
					' ' +
					arrTime[2];			//Second 	
				console.log(sensorData);
				//Insert sensor data
			var query = conn.query(util.sprintf(config.DB.INSERT_SENSOR_DATA, sensorData.type, sensorData.id, sensorData.data, sensorData.timeStamp), function(err){
				if(err) console.log('Error inserting data: ' + err);
				else	console.log('Data inserted');
			});
			
			sensorData.type = 'humidity';
			sensorData.id = 789;
			sensorData.data = parseFloat(arrData[2]).toFixed(2);
			sensorData.timeStamp = arrData[8].substr(0,4) +	//Year 
					' ' +  		
					months[arrData[5]] + 		//Month
					' ' +
					util.zeroFill(arrData[6]) +	//Day
					' ' +
					arrTime[0] + 			//Hour
					' ' + 
					arrTime[1] +			//Minute
					' ' +
					arrTime[2];			//Second 	
				console.log(sensorData);
				//Insert sensor data
			var query = conn.query(util.sprintf(config.DB.INSERT_SENSOR_DATA, sensorData.type, sensorData.id, sensorData.data, sensorData.timeStamp), function(err){
				if(err) console.log('Error inserting data: ' + err);
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
				sensorData.id = 456;
				sensorData.data = 1;
				sensorData.timeStamp = arrData[7] +	//Year
							' ' +
							arrData[6] + 	//Month
							' ' + 
							arrData[5] +	//Day
							' ' +
							arrData[2] +	//Hour
							' ' +
							arrData[3] + 	//Minute
							' ' +
							arrData[4];	//Second
				console.log(sensorData);
				//Insert sensor data
				var query = conn.query(util.sprintf(config.DB.INSERT_SENSOR_DATA, sensorData.type, sensorData.id, sensorData.data, sensorData.timeStamp), function(err){
					if(err) console.log('Error inserting data: ' + err);
					else	console.log('Data inserted');
				});
			}
		}

	});
	client.on('error', function(err){
		console.log(err);
	});
});


cServer.listen(8124, function(){
	console.log('NODE.JS server bound on port 8124');
});

getNewConnection();
