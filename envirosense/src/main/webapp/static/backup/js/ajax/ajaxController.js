/**
 * The Ready AJAX function firstly stops the current AJAX if ever it's running.
 * Afterwards, it starts one AJAX process. Finally, it creates an interval of
 * AJAX processes starting after the time specified.
 */
var refreshInterval;

/**
 * The Stop AJAX function stops the current AJAX if ever it's running.
 */
function stopAjax() {
	clearInterval(refreshInterval);
	refreshInterval = null;
}

function runAjax(domElement) {
	if (refreshInterval !== null) {
		stopAjax();
		/*
		 * Sleep function is used for the "Stop Ajax" function so that the thread
		 * that called that function will be able to finish his tasks before
		 * we clear out the resources it's using.
		 */
		sleep(1000);
	}
	clearPanels();
	
	var dataChoice = domElement.value;
	switch(dataChoice) {
		case "All":
			getDataByAllSensors();
			break;
		
		case "TE":
		case "MO":
			getDataBySensorType(dataChoice);
			
			/*
			 * Since Google applies a fixed width (based on it's parent div) whenever they 
			 * generate their charts, we make a window listener to regenerate the chart 
			 * whenever the window size is altered. 
			 */
			window.onresize = function () {
				setTimeout(function () {
					getDataBySensorType(dataChoice)
				}, 300);
			};
			break;
			
		default:
			alert("Not implemented yet.");
	}
}

function sleep(timeUnits) {
	var startTime = new Date().getTime() + timeUnits;
	while (new Date().getTime() < startTime);
}