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
	/*
	 * Generate the settings panel for SLICK.
	 */
	var settingsForm = createForm("reportSettings", null, null);
	runAjax(settingsForm);

	/*
	 * Since AJAX is asynchronous and the form creation is based on an AJAX
	 * call, the form might not finish being created yet, so before getting the 
	 * settings form, we must make sure it exist first.
	 */
	var formCheck = setInterval(function() {
		if (document.getElementById("reportForm") !== null) {
			formSubmitListeners();
			dropdownListeners();
			windowResizeHandler();
			clearInterval(formCheck);
		}
	}, 100);
}

/**
 * Add "On Submit" events for the forms in the reports page.
 */
function formSubmitListeners() {
	var reportForm = reportForm = document.getElementById("reportForm");
	reportForm.onsubmit = function() {
		runAjax(this);
		return false;
	};
};

/**
 * Dropdown click listeners to set the value of the dropdown based on the
 * value clicked.
 */
function dropdownListeners() {
	var reportForm = document.getElementById("reportForm");
	var sensorEntries = reportForm.getElementsByClassName("sensorEntry");
	for(var index = 0; index < sensorEntries.length; index++) {
		sensorEntries[index].onclick = function(clickEvent) {
			var targetElement = clickEvent.target || clickEvent.srcElement;
			var hiddenElement = document.getElementById("reportForm").dataChoice;
			var containerElement = document.getElementById("reportForm").dataType;
			setValue(hiddenElement, "reportSensors");
			setValue(containerElement, targetElement.textContent || targetElement.innerText);
		};
	}
}


/*
 * Since Google applies a fixed width (based on it's parent div) whenever they 
 * generate their charts, we make a window listener to regenerate the chart 
 * whenever the window size is altered. 
 */
function windowResizeHandler() {
	var resizeFunction = function () {
		setTimeout(function () {
			var reportForm = document.getElementById("reportForm");
			runAjax(reportForm);
		}, 300);
	};
	
	window.addEventListener("resize", resizeFunction);
}