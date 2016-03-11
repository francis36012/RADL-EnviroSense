/**
 * The Ready AJAX function firstly stops the current AJAX if ever it's running.
 * Afterwards, it starts one AJAX process. Finally, it creates an interval of
 * AJAX processes starting after the time specified.
 */
var refreshInterval;

stopAjax();
runAjax();

refreshInterval = setInterval(function() {
	runAjax();
}, 1000);

/**
 * The Stop AJAX function stops the current AJAX if ever it's running.
 */
function stopAjax() {
	clearInterval(refreshInterval);
}

/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function runAjax() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		readyStateChange(xmlHttp);
	};
	xmlHttp.open("GET", "http://localhost:8080/envirosense/api/sensor/all", true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChange(xmlHttp) {
	/*
	 * 0: Hasn't started 1: Connected to the Server 2: Server has received our
	 * request 3: Server is processing 4: Request is finished and data is ready
	 */

	if (xmlHttp.status === 200) {
		//dataLocation.innerHTML = "<img src='http://goo.gl/nxdc5V' style='width: 10%; margin: 5% 45%;' />";

		if (xmlHttp.readyState === 4) {
			var jsonObject = JSON.parse(xmlHttp.responseText);
			var domElements = document.getElementsByClassName("sensorData");
			
			if (jsonObject !== null) {
				if (jsonObject.length > domElements.length) {
					while (jsonObject.length !== domElements.length) {
						$('.single-items').slick("slickAdd", createElementByAllSensors());
					}
				}
				else if (jsonObject.length < domElements.length) {
					while (domElements.length > 0) {
						$('.single-items').slick("slickRemove", false);
					}
				}
			} else {
				domElements = [];
			}
			
			for (var index = 0; index < domElements.length; index++) {
				loadDataByAllSensors(jsonObject[index], domElements[index]);
			}
		}
	} else if (xmlHttp.status === 404)
		document.getElementById('ajaxContainer').innerHTML = "Status 404.";
}

function createElementByAllSensors() {
	/*
	 * For the "All Sensors" JSON object, the pattern would be:
	 *	1.]	id
	 *	2.]	room
	 *		i.		id
	 *		ii.		name
	 *		iii.	description
	 *	3.] name
	 *	4.] sensorType
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
	var sensorRoom = createNode("div", null, null);
	
	var roomHeading = createNode("h5", null, null);
	var roomData = createNode("div", ["roomData", "well", "well-sm"], null);
	var roomId = createNode("div", ["roomId"], null);
	var roomName = createNode("div", ["roomName"], null);
	var roomDescription = createNode("div", ["roomDescription"], null);
	
	roomHeading.innerHTML = "Room Data";
	roomData.appendChild(roomId);
	roomData.appendChild(roomName);
	roomData.appendChild(roomDescription);
	
	sensorRoom.appendChild(roomData);
	sensorData.appendChild(sensorId);
	sensorData.appendChild(sensorName);
	sensorData.appendChild(sensorType);
	sensorData.appendChild(roomHeading);
	sensorData.appendChild(sensorRoom);
	sensorData.innerHTML += "<hr />";
	
	panelBody.appendChild(sensorData);
	panelDiv.appendChild(panelHead);
	panelDiv.appendChild(panelBody);
	
	colDiv.appendChild(panelDiv);
	rowDiv.appendChild(colDiv);
	
	return rowDiv;
}

function loadDataByAllSensors(jsonObject, domElement) {
	var jsonElement = {
		"id" : jsonObject["id"],
		"room" : {
			"id" : jsonObject["room"]["id"],
			"name" : jsonObject["room"]["name"],
			"description" : jsonObject["room"]["description"]
		},
		"name" : jsonObject["name"],
		"sensorType" : jsonObject["sensorType"]
	};
	
	var sensorId = domElement.getElementsByClassName("sensorId")[0];
	var sensorName = domElement.getElementsByClassName("sensorName")[0];
	var sensorType = domElement.getElementsByClassName("sensorType")[0];
	
	var roomId = domElement.getElementsByClassName("roomId")[0];
	var roomName = domElement.getElementsByClassName("roomName")[0];
	var roomDescription = domElement.getElementsByClassName("roomDescription")[0];
	
	sensorId.innerHTML = "ID: " + jsonElement.id;
	sensorName.innerHTML = "Name: " + jsonElement.name;
	sensorType.innerHTML = "Type: " + jsonElement.sensorType;
	
	roomId.innerHTML = "ID: " + jsonElement.room.id + "<br />";
	roomName.innerHTML = "Name: " + jsonElement.room.name + "<br />";
	roomDescription.innerHTML = jsonElement.room.description;
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