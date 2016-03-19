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
	runNavbar();
	runSlick();
	
	/*
	 * Generate the settings panel for SLICK.
	 */
	var settingsForm = createForm("reportSettings", "sensor", null);
	runAjax(settingsForm);
	settingsForm = createForm("reportSettings", "room", null);
	runAjax(settingsForm);

	/*
	 * Since AJAX is asynchronous and the form creation is based on an AJAX
	 * call, the form might not finish being created yet, so before getting the 
	 * settings form, we must make sure it exist first.
	 */
	var formCheck = setInterval(function() {
		if (document.getElementById("reportForm") !== null) {
			formDefaultValues();
			formSubmitListeners();
			dropdownListeners();
			windowResizeHandler();
			clearInterval(formCheck);
		}
	}, 100);
	
}

function formDefaultValues() {
	var reportForm = document.getElementById("reportForm");
	var today = new Date();
	var lastWeek = new Date(new Date(today).setDate(today.getDate() - 7));
	
	var dateRegex = /:\d{2}.\d{3}Z/;
	var fromDate = reportForm.fromDate;
	fromDate.value = lastWeek.toISOString().split(dateRegex)[0];
	var toDate = reportForm.toDate;
	toDate.value = today.toISOString().split(dateRegex)[0];
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
	var roomEntries = reportForm.getElementsByClassName("roomEntry");
	
	for(var index = 0; index < sensorEntries.length; index++) {
		sensorEntries[index].onclick = function(clickEvent) {
			var targetElement = clickEvent.target || clickEvent.srcElement;
			var hiddenElement = document.getElementById("reportForm").dataChoice;
			var containerElement = document.getElementById("reportForm").dataType;
			setValue(hiddenElement, "reportSensors");
			setValue(containerElement, targetElement.textContent || targetElement.innerText);
		};
	}
	
	for(var index = 0; index < roomEntries.length; index++) {
		roomEntries[index].onclick = function(clickEvent) {
			var targetElement = clickEvent.target || clickEvent.srcElement;
			var hiddenElement = document.getElementById("reportForm").dataChoice;
			var containerElement = document.getElementById("reportForm").dataType;
			setValue(hiddenElement, "reportRooms");
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