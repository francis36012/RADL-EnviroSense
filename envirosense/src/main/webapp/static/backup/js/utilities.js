/*
 * Utilities that are necessaryr to display data to the user. It includes 
 * the creation of DOM Elements, and getting Sensor Name by ID.
 * 
 */

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


/* ---------------------------------------- */
/*			CONTAINER CREATION				*/
/* ---------------------------------------- */
function createContainerBySensorType() {
	/*
	 * For the "Sensor By Type" JSON object, the format would be:
	 * 1.]	id
	 * 2.]	sensorType
	 * 3.]	timestamp
	 * 4.]	data
	 * 
	 * For this script, we are going for the format:
	 * 1.]	sensorId
	 * 2.]	sensorType
	 * 3.]	vaules
	 *		i.	timestamp
	 *		ii.	data
	 */
	
	var rowDiv = createNode("div", ["row"], null);
	var colDiv = createNode("div", ["col-xs-12"], null);
	var panelDiv = createNode("div", ["panel", "panel-default"], null);
	var panelHead = createNode("div", ["panel-heading", "text-center"], null);
	var panelBody = createNode("div", ["panel-body"], null);
	
	var sensorData = createNode("div", ["dataContainer"], null);
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

function createContainerByAllSensors() {
	/*
	 * For the "Report" JSON object, the pattern would be:
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
	
	var sensorData = createNode("div", ["dataContainer"], null);
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




function clearPanels() {
	var panelElements = document.getElementsByClassName("dataContainer");
	while(panelElements.length > 0) {
		$(".single-items").slick("slickRemove", false);
	}
}

function getSensorNameById(sensorId) {
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