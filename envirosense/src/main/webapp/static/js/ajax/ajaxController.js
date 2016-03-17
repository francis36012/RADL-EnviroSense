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

function runAjax(formElement) {
	if (refreshInterval !== null) {
		stopAjax();
		/*
		 * Sleep function is used for the "Stop Ajax" function so that the thread
		 * that called that function will be able to finish his tasks before
		 * we clear out the resources it's using.
		 */
		sleep(1000);
	}
	
	var dataChoice = formElement.dataChoice.value;
	switch(dataChoice) {
		case "ALL":
			getDataByAllSensors(formElement);
			break;
		
		case "liveData":
		case "reportSensors":
			getDataBySensorType(formElement);
			break;
			
		case "reportSettings":
			getDataByPageSettings(dataChoice, formElement);
			break;
			
		case "eventToggle":
			setDataByEvents(dataChoice, formElement);
			break;
			
		default:
			console.error("Data choice not implemented Yet.");
	}
}