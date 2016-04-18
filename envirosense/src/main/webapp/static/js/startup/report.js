/**
 * This startup sequence will contain Javascript functions that will initialize 
 * the DOM elements for the HTML like making button listeners and handling form
 * submits.
 */

/*
 * This on start function will run the necessary work even before the page is
 * loaded like the side bar functionality.
 */
runNavbar();
runDateTimePicker();

/**
 * This is used to bind an "On Load" event onto the window object.
 */
if (window.addEventListener) { //W3 Standards
	window.addEventListener('load', startupController, false);
} else if (window.attachEvent) { //Microsoft Standards
	window.attachEvent('onload', startupController);
}

function startupController() {
	formDefaultValues();
	formSubmitListeners();
	
	/*
	 * Generate the settings panel for SLICK.
	 * What this do is to create a settigns panel composed of the data
	 * by both rooms and sensors so the user can select specifically what type
	 * of data they want.
	 * 
	 * Now what we can do is to just make this in HTML/JSP right away instead
	 * of creating the tags in Javascript. However, what would happen if we
	 * implement the application that way, is that we would have a dropdown 
	 * that is empty. So in our case, I have decided that if we receieve data
	 * from the AJAX call, we then make the settings panel. Otherwise, we 
	 * display a message saying that there are no data to display.
	 */
	var settingsForm = createForm("reportSettings", "sensor", null);
	runAjax(settingsForm);
	settingsForm = createForm("reportSettings", "room", null);
	runAjax(settingsForm);
	
	/*
	 * Since AJAX is asynchronous and the dropdown list is filled in through an
	 * AJAX call, we must firstly check if the list is populated already. Once
	 * it is, we then apply a click listener to the dropdown to apply the correct
	 * value in the dropdown.
	 */
	var formCheck = setTimeout(function reportInterval() {
		if (document.getElementsByClassName("dropdown-menu")[0].children.length > 0) {
			clearTimeout(formCheck);
			dropdownListeners();
		} else {
			setTimeout(reportInterval, 100);
		}
	}, 100);
	
}

function formDefaultValues() {
	var reportForm = document.getElementById("reportForm");
	var today = new Date();
	var lastWeek = new Date(new Date(today).setDate(today.getDate() - 7));
	
	/*
	 * Firefox doesn't support native HTML5 date picker, so the user might have to 
	 * manually type in the date in plain text whenever they're using Firefox.
	 * 
	 * Firefox doesn't support setting the value of the date and time in these 
	 * textboxes either. So far, only Google Chrome masterrace is the one
	 * that supports most of the functionalities implemented in our front-end.
	 */
	var dateRegex = /[T]|.\d{3}Z/g;
	var fromDate = reportForm.fromDate;
	fromDate.value = lastWeek.toISOString().replace(dateRegex, " ");
	var toDate = reportForm.toDate;
	toDate.value = today.toISOString().replace(dateRegex, " ");
}

/**
 * Add "On Submit" events for the forms in the reports page.
 */
function formSubmitListeners() {
	var reportForm = document.getElementById("reportForm");
	reportForm.onsubmit = function() {
		if (reportForm.dataType.value !== "") {
			runAjax(this);
		}
		return false;
	};
};

/**
 * Dropdown click listeners to set the value of the dropdown based on the
 * value clicked.
 */
function dropdownListeners() {
	
	var sensorEntryTimeout = setTimeout(function sensorEntryCallback() { 
		var reportForm = document.getElementById("reportForm");
		var sensorEntries = reportForm.getElementsByClassName("sensorEntry");
		
	
		if (sensorEntries !== null) {
			clearTimeout(sensorEntryTimeout);
			
			for(var index = 0; index < sensorEntries.length; index++) {
				sensorEntries[index].onclick = function(clickEvent) {
					var targetElement = clickEvent.target || clickEvent.srcElement;
					var hiddenElement = document.getElementById("reportForm").dataChoice;
					var containerElement = document.getElementById("reportForm").dataType;
					setValue(hiddenElement, "reportSensors");
					setValue(containerElement, targetElement.textContent || targetElement.innerText);
				};
			}
		} else {
			setTimeout(sensorEntryCallback, 300);
		}
	}, 300);
	
	var roomEntryTimeout = setTimeout(function roomEntryCallback() {
		var reportForm = document.getElementById("reportForm");
		var roomEntries = reportForm.getElementsByClassName("roomEntry");
		
		if (roomEntries !== null) {
			clearTimeout(roomEntryTimeout);
			
			for(var index = 0; index < roomEntries.length; index++) {
				roomEntries[index].onclick = function(clickEvent) {
					var targetElement = clickEvent.target || clickEvent.srcElement;
					var hiddenElement = document.getElementById("reportForm").dataChoice;
					var containerElement = document.getElementById("reportForm").dataType;
					setValue(hiddenElement, "reportRooms");
					setValue(containerElement, targetElement.textContent || targetElement.innerText);
				};
			}
		} else {
			setTimeout(roomEntryCallback, 300);
		}
	}, 300);
}


/*
 * Since Google applies a fixed width (based on it's parent div) whenever they 
 * generate their charts, we make a window listener to regenerate the chart 
 * whenever the window size is altered. 
 */
function windowResizeHandler() {
	/*
	 * For android browsers, it's calling the onscroll event even if you just 
	 * scroll up. This is because of the address bar of the top of the browser.
	 * It fires the resize event whenever it appears/disappears when scrolling.
	 */
	
	var resizeFunction = function () {
		setTimeout(function () {
			var reportForm = document.getElementById("reportForm");
			var submitButton = reportForm.elements["submitButton"];
			
			if (!submitButton.disabled) {
				runAjax(reportForm);
			}
		}, 300);
	};
	
	if (window.addEventListener) { //W3 Standards
		window.addEventListener('resize', resizeFunction, false);
	} else if (window.attachEvent) { //Microsoft Standards
		window.attachEvent('onresize', resizeFunction);
	}
}