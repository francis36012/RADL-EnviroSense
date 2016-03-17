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
	$("[class='bootstrapSwitch']").on("switchChange.bootstrapSwitch", function (event, state) {
		buttonListener
	});
}

function buttonListener() {
	
}