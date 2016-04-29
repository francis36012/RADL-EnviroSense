/*
MIT License

Copyright (c) 2014-2016 reelyActive

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


var barnowl = require("barnowl");

//enableMixing allows the reelceivers to grab more than one signal and display it.
var middleware = new barnowl( { enableMixing: true } );

//Variables to help reducing the amount of data to insert every 3 seconds
var firstTimeRead = {};
var lastTimeSeen = {};

//bids [] stores the ids of the beacons stored in the database
var bids=[];

//map{} array of objects with the key which is the id and the value which is the user:example@edu.sait.edu
var map={};

var reelceiverMap = {
	'001bc50940810102': 5,
	'001bc50940810101': 11
};

// The barnowl package needs an ip
// The loopback address or localhost won't work here
// Change to match the IP of the server this package is run on
var localIp = '192.168.128.13';

// This is the base URL for envirosense
var envirosenseUrl = 'http://enviro.saitradlab.ca';

// This is the base URL for the envirosense web application
// The port number should be changed in accordance with the port
// configured for the application container (contact devops)
var envirosenseWebUrl = envirosenseUrl + ':8080';

// Base URL for the envirosense HTTP API
var envirosenseApiUrl = envirosenseWebUrl + '/api';
var config = {
	'api': {
		'loginEmail': 'sergio.diazchavez@edu.sait.ca',
		'loginPassword': 'password',
		'loginUrl': envirosenseWebUrl + '/login',
		'beaconInfoUrl': envirosenseApiUrl + '/beacon/all',
		'dataPostUrl': envirosenseApiUrl + '/data/new',
	},
	'sensorType': 'RA',
	'barnowlServerAddress': localIp + ':5000'
};


var request = require("request");
request = request.defaults({jar: true});
var token;

/*
Function that is being called to connect the API
*/
connectAPI(function(error) {
	if(error){
		console.log(error);
	} else {
		//populates the bids[] array with the database id and user
		getBeaconAPI(function(error, data){
			if(error) {
				console.log(error);
			} else {
				var dataJSON = JSON.parse(data);
				dataJSON.forEach(function(d) {
					//here is where push the ids and users to bids
					bids.push(d.id);
					//object created named map to store the
					//key is the id of the beacon and the email is the value
					map[d.id]=d.user
					firstTimeRead[d.id]=false;
				});
			}
		});
	}
});

// Information of the server that will be directed the packages of information.
middleware.bind({protocol: 'udp', path: config.barnowlServerAddress}); 

//Detection of the beacon automatically		
middleware.on('visibilityEvent', function(tiraid) {
	
	// If the reelceiver id value is not null or rssi is not empty do not do nothing
	if(!tiraid.radioDecodings[0].identifier || !tiraid.radioDecodings[0].rssi) {

	//if conditions are met then define the values
	} else {
		// value or distance of the object it is calculated by the rssi value
		var rssi = tiraid.radioDecodings[0].rssi; 
		// value of reelceiver id you can find in the back of the reelceivers
		var reelceiver = tiraid.radioDecodings[0].identifier.value;
		// value for the time that the information was received example: "2016-04-07T16:11:22.345Z"
		var timestamp = tiraid.timestamp;
		
		//Converting the bluetooh beacon timezone		
		var targetTime = new Date(timestamp);
		var timeZoneFromDB = -12.00;
		var tzDifference = timeZoneFromDB * 60 + targetTime.getTimezoneOffset();
		var offsetTime = new Date(targetTime.getTime() + tzDifference * 60 * 1000);
		timestamp=offsetTime.toISOString();
		
		//When the script runs there is some times that the information can't be send from the hub to the server
		//for this case it is checked before instance the variable with the information if really or still undefined
		//to avoid that the application crashed.
		if(typeof(tiraid.identifier.advData.manufacturerSpecificData)== "undefined") {
			
		} else {
			//Instanciation of the variable id with the information of the beacon manufacturer ID
			//3 out of 5 beacons keept the same ID over night with out battery, after keep the battery
			//the ids are the same.
			var id = tiraid.identifier.advData.manufacturerSpecificData.data;
		}
		if(reelceiver!=null && id!=undefined){
			if(bids.indexOf(id) > -1) {
				var jasonObject = {
					"sensorId": reelceiverMap[reelceiver] , //Hardcoded value for sensor id in the database table sensor.
					 "data":{
						"rssi":rssi,  
						"beaconID": id,
						"userEmail": map[id],
					},
					"timestamp": timestamp,
					"sensorType": "RA"
				}
				
				if(firstTimeRead[id]==false) {
					lastTimeSeen[id]=timestamp;
					firstTimeRead[id]=true;
					insertAPI(jasonObject,function(error){
						if (error) {
							console.log(error);
						}
					});
				} else {
					var date1 = new Date(timestamp);
					var date2 = new Date(lastTimeSeen[id]);
					
					if(date1-date2 > 3000) {
						lastTimeSeen[id]=timestamp;
						insertAPI(jasonObject,function(error){
							if (error) {
								console.log(error);
							}
						});
					}
				}
			}
		}
	}
});  
	
		
/**
 * Insert a data set through the API
 */
function insertAPI (data, callback) {
    var options = {
		method: 'POST',
		url: config.api.dataPostUrl, 
		headers: {
			'content-type': 'application/json',
			'cache-control': 'no-cache',
			'x-csrf-token': token
		}, 
		body: [
			{
				sensorId: data.sensorId,
				"data":{
					"rssi":data.data.rssi,  
					"beaconId": data.data.beaconID,
					"userEmail": map[data.data.beaconID],
				},
				timestamp: data.timestamp,
				sensorType: data.sensorType
			}
		], //Hardcoded value for sensor type
		json: true,
		followAllRedirects: true,
		timeout: 2000   
   };
					
    request(options, function (error, response, body) {
        if (error || response.statusCode != 200) {
            callback(new Error('Error inserting data to API. Timestamp: ' + data.timestamp));   
        } else{
            callback();//Success
        } 
    });                
}  

function connectAPI(callback){
    var options = {
		method: 'GET',
		url: config.api.loginUrl,
		headers: {'cache-control': 'no-cache'},
		followAllRedirects: true,
		timeout: 3000
	};

    request(options, function (error, response, body) {
        if (error || response.statusCode!= 200) {
			callback(new Error('Error on the first API GET'));
        } else {
            var options = {
				method: 'POST',
				url: config.api.loginUrl,
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
					'cache-control': 'no-cache',
					'x-csrf-token': response.headers['x-csrf-token'] 
				},
				form: {
					email: config.api.loginEmail, 
					password: config.api.loginPassword
				},
				followAllRedirects: true                           
			}                                                                    

            request(options, function (error, response, body) {
                if (error || response.statusCode != 200) {
                    callback(new Error('Error on the API login attempt'));
                } else {      
                    token = response.headers['x-csrf-token'];
					console.log("Connected to API");
                    callback();//Success               
                }               
            });
        }
    });   
}


/**
 * Get the beacons id from the database
 */
function getBeaconAPI(callback){
	var options = {
		method: 'GET',
		url: config.api.beaconInfoUrl,
		headers: {
			'cache-control': 'no-cache',
			'x-csrf-token': token
		}			
	};

	request(options, function(error, response, body) {
		if(error || response.statusCode != 200) {
			callback(new Error('Error getting beacons id'));
		} else {
			callback(null, response.body);
		}
	});				
};
