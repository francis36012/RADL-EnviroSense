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
		 * Sleep function is used for the "stopAjax" function so that the thread
		 * that called that function will be able to finish his tasks before
		 * we clear out the resources it's using.
		 */
		sleep(1000);
	}
	clearPanels();
	
	var dataChoice = domElement.name;
	switch(dataChoice) {
		case "all":
			getDataByAllSensors();
			break;
		
		case "type":
			getDataBySensorType();
			
			/*
			 * Since Google applies a fixed width (based on it's parent div) whenever they 
			 * generate their charts, we make a window listener to regenerate the chart 
			 * whenever the window size is altered. 
			 */
			window.onresize = function () {
				setTimeout(getDataBySensorType, 300);
			};
			
			break;
			
		default:
			alert("Not implemented yet.");
	}
	$(".single-items").slick("slickNext");
}

function sleep(timeUnits) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + timeUnits);
}