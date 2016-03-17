/**
 * This startup sequence will contain Javascript functions that will initialize 
 * the DOM elements for the HTML like making button listeners and handling form
 * submits.
 */

/**
 * This is used to bind an "On Load" event onto the window object.
 */
if (window.addEventListener) { //W3 Standards
	window.addEventListener('load', startupController, false);
} else if (window.attachEvent) { //Microsoft Standards
	window.attachEvent('onload', startupController);
}

function startupController() {
	var settingsForm = createNode("form", ["form"], null);
	var hiddenInput = createNode("input", null, [["name", "dataChoice"], ["value", "ALL"], ["type", "text"]]);
	settingsForm.appendChild(hiddenInput);
	
	runAjax(settingsForm);
	temperatureData();
	humidityData();
	motionData();
	doorData();
}

function temperatureData() {
	var settingsForm = createNode("form", ["form"], null);
	var hiddenInput1 = createNode("input", null, [["name", "dataChoice"], ["value", "liveData"], ["type", "text"]]);
	var hiddenInput2 = createNode("input", null, [["name", "category"], ["value", "Sensor"], ["type", "text"]]);
	var hiddenInput3 = createNode("input", null, [["name", "type"], ["value", "Temperature"], ["type", "text"]]);
	settingsForm.appendChild(hiddenInput1);
	settingsForm.appendChild(hiddenInput2);
	settingsForm.appendChild(hiddenInput3);
	
	setInterval(function () {
		runAjax(settingsForm);
	}, 300);
};

function humidityData() {
	var settingsForm = createNode("form", ["form"], null);
	var hiddenInput1 = createNode("input", null, [["name", "dataChoice"], ["value", "liveData"], ["type", "text"]]);
	var hiddenInput2 = createNode("input", null, [["name", "category"], ["value", "Sensor"], ["type", "text"]]);
	var hiddenInput3 = createNode("input", null, [["name", "type"], ["value", "Humidity"], ["type", "text"]]);
	settingsForm.appendChild(hiddenInput1);
	settingsForm.appendChild(hiddenInput2);
	settingsForm.appendChild(hiddenInput3);
	
	setInterval(function () {
		runAjax(settingsForm);
	}, 300);
}

function motionData() {
	var settingsForm = createNode("form", ["form"], null);
	var hiddenInput1 = createNode("input", null, [["name", "dataChoice"], ["value", "liveData"], ["type", "text"]]);
	var hiddenInput2 = createNode("input", null, [["name", "category"], ["value", "Sensor"], ["type", "text"]]);
	var hiddenInput3 = createNode("input", null, [["name", "type"], ["value", "Motion"], ["type", "text"]]);
	settingsForm.appendChild(hiddenInput1);
	settingsForm.appendChild(hiddenInput2);
	settingsForm.appendChild(hiddenInput3);
	
	setInterval(function () {
		runAjax(settingsForm);
	}, 300);
}


function doorData() {
	var settingsForm = createNode("form", ["form"], null);
	var hiddenInput1 = createNode("input", null, [["name", "dataChoice"], ["value", "liveData"], ["type", "text"]]);
	var hiddenInput2 = createNode("input", null, [["name", "category"], ["value", "Sensor"], ["type", "text"]]);
	var hiddenInput3 = createNode("input", null, [["name", "type"], ["value", "Door"], ["type", "text"]]);
	settingsForm.appendChild(hiddenInput1);
	settingsForm.appendChild(hiddenInput2);
	settingsForm.appendChild(hiddenInput3);
	
	setInterval(function () {
		runAjax(settingsForm);
	}, 300);
}