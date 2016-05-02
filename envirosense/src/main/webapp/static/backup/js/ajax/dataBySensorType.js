/**
 * Initialize Google Charts. Make sure to put the appropriate script for the
 * construction of this object found in Google Charts' API.
 */
google.charts.load('current', {
	packages: ['corechart', 'line']
});

/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function getDataBySensorType(sensorType, startTime, endTime, buttonLoader) {
	//startTime = startTime.getYear() + " " + startTime.getMonth() + " " + startTime.getDay();
	//endTime = endTime.getYear() + " " + endTime.getMonth() + " " + endTime.getDay();
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		readyStateChangeBySensorType(xmlHttp, buttonLoader);
	};
	//xmlHttp.open("GET", "/envirosense/api/report/type/" + sensorType + "/"+ startTime + " 00:00:00/" + endTime + " 00:00:00", false);
	xmlHttp.open("GET", "http://localhost:8080/envirosense/api/report/type/MO/2015-01-01 00:00:00/2016-03-01 00:00:00", true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChangeBySensorType(xmlHttp, buttonLoader) {
	var laddaButton = Ladda.create(buttonLoader);
	laddaButton.start();
	laddaButton.setProgress(0);
	
	try {
		/*
		 * HTTP States
		 * 
		 * 0: Hasn't started 
		 * 1: Connected to the Server 
		 * 2: Server has received our request 
		 * 3: Server is processing 
		 * 4: Request is finished and data is ready
		 */
		var dataContainer = document.getElementsByClassName("dataContainer");

		if (xmlHttp.status === 200) {
			laddaButton.setProgress(.3);

			if (xmlHttp.readyState === 4) {
				var jsonObject = JSON.parse(xmlHttp.responseText);
				jsonObject = reformatJsonBySensorType(jsonObject, "sensorId");
				laddaButton.setProgress(.5);

				if (jsonObject !== null) {
					if (jsonObject.length > dataContainer.length) {
						while (jsonObject.length !== dataContainer.length) {
							$('.single-items').slick("slickAdd", createContainerBySensorType());
						}
					} else if (jsonObject.length < dataContainer.length) {
						while (dataContainer.length > jsonObject.length) {
							$('.single-items').slick("slickPrev");
							$('.single-items').slick("slickRemove", false);
						}
					}
				} else {
					//No Data Found
				}

				laddaButton.setProgress(.8);

				for (var index = 0; index < jsonObject.length; index++) {
					loadDataBySensorType(jsonObject[index], dataContainer[index]);
				}

				laddaButton.setProgress(1);
			}
		} else if (xmlHttp.status === 404) {
			//Can't connect
		}
		
		setTimeout(function () {
		laddaButton.stop();
	}, 1000);
	
	} catch (errorEvent) {
		laddaButton.setProgress(0);
		
		setTimeout(function () {
			laddaButton.stop();
		}, 1000);
		
		throw errorEvent;
	}
}



function reformatJsonBySensorType(jsonObject, sortKey) {
	/*
	 * Suggested JSON format:
	 * 1.]	sensorId
	 * 2.]	sensorType
	 * 3.]	values
	 *		i.	timestamp
	 *		ii.	data
	 */
	var formattedJson = {
		sensorId: null,
		sensorType: null,
		values: null
	};
	var uniqueId = [];
	var jsonAttributes = [];
	var jsonData = [];
	var returnValue = [];
	
	for (var index = 0; index < jsonObject.length; index++) {
		var jsonProperty = {
			timestamp: null, 
			data: null
		};
		var sortAttribute = jsonObject[index][sortKey];
		
		if (uniqueId.indexOf(sortAttribute) < 0) {
			uniqueId.push(sortAttribute);
			jsonAttributes.push(jsonObject[index]["sensorType"]);
			jsonData.push([]);
		}
		
		/*
		 * Since Google Charts isn't very stable when handling boolean values,
		 * we have to change the JSON object's boolean values to either 1 or 0
		 * if ever there is a boolean value present in the data.
		 */
		if (jsonObject[index]["data"]) {
			jsonObject[index]["data"] = 1;
		} else {
			jsonObject[index]["data"] = 0;
		}
		
		jsonProperty.timestamp = jsonObject[index]["timestamp"];
		jsonProperty.data = jsonObject[index]["data"];
		
		jsonData[uniqueId.indexOf(sortAttribute)].push(jsonProperty);
	}
	
	for (var index = 0; index < uniqueId.length; index++) {
		formattedJson = new Object();
		formattedJson.sensorId = uniqueId[index];
		formattedJson.sensorType = jsonAttributes[index];
		formattedJson.values = jsonData[index];
		
		returnValue.push(formattedJson);
	}
	return JSON.parse(JSON.stringify(returnValue));
}



/* ---------------------------------------- */
/*				DATA LOADER					*/
/* ---------------------------------------- */

function loadDataBySensorType(jsonObject, domElement) {
	var jsonElement = {
		id: jsonObject["sensorId"],
		sensorType: jsonObject["sensorType"],
		values: {
			timestamp: jsonObject["timestamp"],
			data: jsonObject["data"]	
		}
	};
	
	var sensorId = domElement.getElementsByClassName("sensorId")[0];
	var sensorName = domElement.getElementsByClassName("sensorName")[0];
	var sensorType = domElement.getElementsByClassName("sensorType")[0];
	var sensorTime = domElement.getElementsByClassName("sensorTime")[0];
	
	sensorId.innerHTML = "ID: " + jsonElement.id;
	sensorName.innerHTML = "Name: " + "My Sensor";
	sensorType.innerHTML = "Type: " + jsonElement.sensorType;
	generateChartBySensorType(jsonObject, sensorTime, jsonElement.sensorType);
}

function generateChartBySensorType(jsonObject, domElement, sensorType) {
	var rawData = [];
	for (var index = 0; index < jsonObject.values.length; index++) {
		rawData.push([new Date(jsonObject.values[index]["timestamp"]), jsonObject.values[index]["data"]]);
	}
	
	if (sensorType == "TE") {
		google.charts.setOnLoadCallback(function () {
			var data = new google.visualization.DataTable();
			data.addColumn('datetime', 'X');
			data.addColumn('number');
			data.addRows(rawData);

			var options = {
				hAxis: {
					title: 'Time'
				},
				vAxis: {
					title: 'Celcius'
				},
				legend: {
					position: 'none'
				}
			};

			var chart = new google.visualization.LineChart(domElement);
			chart.draw(data, options);
		});
	} else if (sensorType == "MO") {
		google.charts.setOnLoadCallback(function () {
			var data = new google.visualization.DataTable();
			data.addColumn('datetime', 'X');
			data.addColumn('number', 'Motion');
			data.addRows(rawData);

			var options = {
				hAxis: {
					title: 'Time'
				},
				vAxis: {
					title: 'Motion',
					ticks: [0, 1],
					viewWindow: {
						min: 0,
						max: 1
					}
				},
				legend: {
					position: 'none'
				}
			};

			var chart = new google.visualization.ScatterChart(domElement);
			chart.draw(data, options);
		});
	}
	
	return domElement;
}