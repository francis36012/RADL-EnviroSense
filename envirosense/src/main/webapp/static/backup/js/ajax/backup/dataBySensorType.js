/*
 * Initialize Google Charts. Make sure to put the appropriate script for the
 * construction of this object found in Google Charts' API.
 */
google.charts.load('current', {
	packages: ['corechart', 'line']
});

/*
 * Since Google applies a fixed width (based on it's parent div) whenever they 
 * generate their charts, we make a window listener to regenerate the chart 
 * whenever the window size is altered. 
 */
window.onresize = loadDataBySensorType;
loadDataBySensorType();

/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function getDataBySensorType() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		readyStateChange(xmlHttp);
	};
	xmlHttp.open("GET", "http://localhost:8080/envirosense/api/report/type/TE/2015-01-01 00:00:00/2016-03-01 00:00:00", true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChange(xmlHttp) {
	/*
	 * HTTP States
	 * 
	 * 0: Hasn't started 
	 * 1: Connected to the Server 
	 * 2: Server has received our request 
	 * 3: Server is processing 
	 * 4: Request is finished and data is ready
	 */
	var dataContainer = document.getElementsByClassName("sensorData");
	
	if (xmlHttp.status === 200) {
		if (xmlHttp.readyState === 4) {
			var jsonObject = JSON.parse(xmlHttp.responseText);
			jsonObject = reformatJson(jsonObject, "sensorId");
			
			if (jsonObject !== null) {
				if (jsonObject.length > dataContainer.length) {
					while (jsonObject.length !== dataContainer.length) {
						$('.single-items').slick("slickAdd", createElementBySensorType());
					}
				} else if (jsonObject.length < dataContainer.length) {
					while (dataContainer.length > 0) {
						$('.single-itmes').slick("slickPrev");
						$('.single-items').slick("slickRemove", false);
					}
				}
			} else {
				//No Data Found
			}
			
			for (var index = 0; index < jsonObject.length; index++) {
				loadDataBySensorType(jsonObject[index], dataContainer[index]);
			}
		}
	} else if (xmlHttp.status === 404)
		//Can't connect
}


function reformatJson(jsonObject, sortType) {
	/*
	 * Suggested JSON format:
	 * 1.]	sensorId
	 * 2.]	values
	 *		i.	timestamp
	 *		ii.	data
	 */
	var formattedJson = {
		"sensorId" : null,
		"values" : null
	};
	var uniqueId = [];
	var jsonData = [];
	var returnValue = [];
	
	for (var index = 0; index < jsonObject.length; index++) {
		var jsonProperty = {
			"timestamp" : null, 
			"data" : null
		};
		var sortAttribute = jsonObject[index][sortType];
		
		if (uniqueId.indexOf(sortAttribute) < 0) {
			uniqueId.push(sortAttribute);
			jsonData.push([]);
		}
		jsonProperty.timestamp = jsonObject[index]["timestamp"];
		jsonProperty.data = jsonObject[index]["data"];
		
		jsonData[uniqueId.indexOf(sortAttribute)].push(jsonProperty);
	}
	
	for (var index = 0; index < uniqueId.length; index++) {
		formattedJson = new Object();
		formattedJson.sensorId = uniqueId[index];
		formattedJson.values = jsonData[index];
		
		returnValue.push(formattedJson);
	}
	return JSON.parse(JSON.stringify(returnValue));
}



/* ---------------------------------------- */
/*				DATA CREATION				*/
/* ---------------------------------------- */
function createElementBySensorType() {
	/*
	 * For the "Sensor By Type" JSON object, the format would be:
	 * 1.]	id
	 * 2.]	timestamp
	 * 3.]	data
	 * 
	 * For this script, we are goign for the format:
	 * 1.]	sensorId
	 * 2.]	vaules
	 *		i.	timestamp
	 *		ii.	data
	 */
	
	var rowDiv = createNode("div", ["row"], null);
	var colDiv = createNode("div", ["col-xs-12"], null);
	var panelDiv = createNode("div", ["panel", "panel-default"], null);
	var panelHead = createNode("div", ["panel-heading", "text-center"], null);
	var panelBody = createNode("div", ["panel-body"], null);
	
	var sensorData = createNode("div", ["sensorData"], null);
	var sensorId = createNode("div", ["sensorId"], null);
	var sensorName = createNode("div", ["sensorName"], null);
	var sensorType = createNode("div", ["sensorType"], null);
	var sensorTime = createNode("div", ["sensorTime"], null);
	
	sensorData.appendChild(sensorId);
	sensorData.appendChild(sensorName);
	sensorData.appendChild(sensorType);
	sensorData.innerHTML += "<hr />";
	sensorData.appendChild(sensorTime);
	
	panelBody.appendChild(sensorData);
	panelDiv.appendChild(panelHead);
	panelDiv.appendChild(panelBody);
	
	colDiv.appendChild(panelDiv);
	rowDiv.appendChild(colDiv);
	
	return rowDiv;
}

function loadDataBySensorType(jsonObject, domElement) {
	var jsonElement = {
		"id" : jsonObject["sensorId"],
		"values" : {
			"timestamp" : jsonObject["timestamp"],
			"data" : jsonObject["data"]	
		}
	};
	
	var sensorId = domElement.getElementsByClassName("sensorId")[0];
	var sensorName = domElement.getElementsByClassName("sensorName")[0];
	var sensorType = domElement.getElementsByClassName("sensorType")[0];
	var sensorTime = domElement.getElementsByClassName("sensorTime")[0];
	
	sensorId.innerHTML = "ID: " + jsonElement.id;
	sensorName.innerHTML = "Name: " + "My Temperature";
	sensorType.innerHTML = "Temperature";
	sensorTime.innerHTML = "";
	sensorTime.appendChild(generateChart(jsonObject));
}

function generateChart(jsonObject) {
	var domElement = createNode("div", null, null);
	
	var rawData = [];
	for (var index = 0; index < jsonObject.values.length; index++) {
		rawData.push([new Date(jsonObject.values[index]["timestamp"]), jsonObject.values[index]["data"]]);
	}
	
	google.charts.setOnLoadCallback(function () {
		var data = new google.visualization.DataTable();
		data.addColumn('date', 'X');
		data.addColumn('number', 'Value');
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
	
	return domElement;
}



function createNode(tagName, className, attributeValues) {
	var newElement = document.createElement(tagName);
	
	if (className !== null) {
		for(var index = 0;
			index < className.length;
			index++) {
				newElement.classList.add(className[index]);
			}
	}
	
	if (attributeValues !== null)
	{
		for(var outerIndex = 0;
			outerIndex < attributeValues.length;
			outerIndex++) {
				
				for(var innerIndex = 0;
					innerIndex < attributeValues[outerIndex].length;
					innerIndex++) {
				newElement.setAttribute(attributeValues[outerIndex][0], attributeValues[outerIndex][innerIndex]);
			}
		}
	}
	
	return newElement;
}

function getSensorName(sensorId) {
	var returnValue;
	switch (sensorId)
	{
		case 1:
			returnValue = "Temperature";
			break;
		case 2:
			returnValue = "Humidity";
			break;
		case 3:
			returnValue = "Door";
			break;
		default:
			returnValue = "";
			console.err("Warning: Sensor name for ID " + sensorId + " unknown.");
	}
	return returnValue;
}