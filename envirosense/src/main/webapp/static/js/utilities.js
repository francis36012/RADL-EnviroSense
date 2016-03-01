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

function clearPanel(domElement) {
	
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