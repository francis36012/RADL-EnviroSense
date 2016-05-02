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
function createContainerByPageSettings(webPage) {
	switch (webPage) {
		case "report":
			var settingsContainerRow1 = createNode("div", ["row"], null);
			var settingsContainerRow1Col1 = createNode("div", ["col-xs-12"], null);
			
			var settingsContainerRow2 = createNode("div", ["row", "form-group"], null);
			var settingsContainerRow2Col1 = createNode("div", ["col-xs-10", "col-xs-offset-1"], null);
			var settingsForm = createNode("form", ["form", "form-horizontal"], [["id", "reportForm"], ["role", "form"]]);
			var settingsAnchorToggle = createNode("button", ["btn", "btn-default", "btn-block"], [["data-toggle", "dropdown"],["name", "dataChoice"]]);
			var settingsUnorderedList = createNode("ul", ["dropdown-menu", "btn-block"], null);
			
			var settingsContainerRow3 = createNode("div", ["row", "form-group"], null);
			var settingsContainerRow3Col1 = createNode("div", ["col-xs-10"], null);
			var settingsLabel1 = createNode("label", ["col-xs-2", "control-label"], null);
			var settingsInput1 = createNode("input", ["form-control"], [["type", "datetime-local"]]);
			settingsLabel1.innerHTML = "From";
			
			var settingsContainerRow4 = createNode("div", ["row", "form-group"], null);
			var settingsLabel2 = createNode("label", ["col-xs-2", "control-label"], null);
			var settingsContainerRow4Col1 = createNode("div", ["col-xs-10"], null);
			var settingsInput2 = createNode("input", ["form-control"], [["type", "datetime-local"]]);
			settingsLabel2.innerHTML = "To"
			
			var settingsContainerRow5 = createNode("div", ["row", "form-group"], null);
			var settingsContainerRow5Col1 = createNode("div", ["col-xs-4", "col-xs-offset-8"], null);
			var settingsSubmit = createNode("button", ["btn", "btn-default", "btn-block", "ladda-button"], [["type", "submit"], ["name", "submitButton"], ["data-style", "slide-down"], ["data-spinner-color", "#333"]]);
			settingsSubmit.innerHTML = "Submit";
			
			settingsContainerRow5Col1.appendChild(settingsSubmit);
			settingsContainerRow5.appendChild(settingsContainerRow5Col1);
			
			settingsContainerRow4Col1.appendChild(settingsInput2);
			settingsContainerRow4.appendChild(settingsLabel2);
			settingsContainerRow4.appendChild(settingsContainerRow4Col1);
			
			settingsContainerRow3Col1.appendChild(settingsInput1);
			settingsContainerRow3.appendChild(settingsLabel1);
			settingsContainerRow3.appendChild(settingsContainerRow3Col1);
			
			settingsContainerRow2Col1.appendChild(settingsAnchorToggle);
			settingsContainerRow2Col1.appendChild(settingsUnorderedList);
			settingsContainerRow2.appendChild(settingsContainerRow2Col1);
			
			settingsForm.appendChild(settingsContainerRow2);
			settingsForm.appendChild(settingsContainerRow3);
			settingsForm.appendChild(settingsContainerRow4);
			settingsForm.appendChild(settingsContainerRow5);
			
			settingsContainerRow1Col1.appendChild(settingsForm);
			settingsContainerRow1.appendChild(settingsContainerRow1Col1);
			
			return settingsContainerRow1;
			break;
			
		case "index":
			break;
			
		default:
			break;
	}
	
	return settingsContainerRow1;
}

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

function createPanel() {
	var rowDiv = createNode("div", ["row"], null);
	var colDiv = createNode("div", ["col-xs-12"], null);
	var panelDiv = createNode("div", ["panel", "panel-default"], null);
	var panelHead = createNode("div", ["panel-heading", "text-center"], null);
	var panelBody = createNode("div", ["panel-body"], null);
	
	panelDiv.appendChild(panelHead);
	panelDiv.appendChild(panelBody);

	colDiv.appendChild(panelDiv);
	rowDiv.appendChild(colDiv);
	
	return rowDiv;
}

function clearPanels() {
	var panelElements = document.getElementsByClassName("dataContainer");
	for (var index = 0; index < panelElements.length; index++) {
		for (var innerIndex = 0; innerIndex < panelElements[index].childNodes.length; innerIndex++) {
			panelElements[index].childNodes[innerIndex].innerHTML = "";
		}
	}
}

function getSensorNameByType(sensorType) {
	var returnValue;
	switch (sensorType)
	{
		case "TE":
			returnValue = "Temperature";
			break;
		case "HU":
			returnValue = "Humidity";
			break;
		case "MO":
			returnValue = "Motion";
			break;
		default:
			returnValue = "";
			console.error("Warning: Sensor name for Type \"" + sensorType + "\" unknown.");
	}
	return returnValue;
}

function getSensorTypeByName(sensorName) {
	var returnValue;
	switch (sensorName)
	{
		case "Temperature":
			returnValue = "TE";
			break;
		case "Humidity":
			returnValue = "HU";
			break;
		case "Motion":
			returnValue = "MO";
			break;
		default:
			returnValue = "";
			console.error("Warning: Sensor type for Name \"" + sensorType + "\" unknown.");
	}
	return returnValue;
}

function setValue(containerElement, dataChoice) {
	containerElement.innerHTML = dataChoice;
	containerElement.value = dataChoice;
}