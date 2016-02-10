'use strict'

//*********** Probably the best solution is to move all this function to server

var mysql	= require('mysql'),
    config	= require('../config.js');

module.exports.getNewConnection = getNewConnection();

function getNewConnection(localPop){
	
	var connection = null;	

	if(localPop === 1){
		connection = mysql.createConnection({
			host	: config.DB.LOCALHOST,
			user	: config.DB.USERNAME,
			password: config.DB.PASSWORD,
			database: config.DB.DB_NAME,
			port	: config.DB.PORT		
		}); 
		console.log('Emergency (internal) database');
	}
	else {
		connection = mysql.createConnection({
			host	: config.DB.HOST,
			user	: config.DB.USERNAME,
			password: config.DB.PASSWORD,
			database: config.DB.DB_NAME,
			port	: config.DB.PORT
		});
		console.log('Main (external) database');
	}
	connection.connect(function(err){
		if(err){
			console.log('Database connection error: ' + err);
			setTimeout(getNewConnection, 1000);
		}
		else {
			console.log('Database connection successful!');

			//CHECK THE LOCAL DB FOR DATA BEFORE?
		}
	});

	connection.on('error', function(err){
		console.log('Database error: ', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			console.log('Database connection lost! Start emergency backup on local database');

			//MAYBE TRY TO RECONNECT FOR 30 seconds BEFORE?			

			var newConn = getNewConnection(1);

			setTimeout(getNewConnection, 1000);
			
			return newConn;

		} else {
			throw err;
		}
	});
	
	return connection;
}
