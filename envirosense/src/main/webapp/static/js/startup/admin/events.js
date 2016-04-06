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
	runBootstrapSwitch();
	
	document.getElementById("enableAll").onclick = enableAll;
	document.getElementById("disableAll").onclick = disableAll;
	
	$("[class='bootstrapSwitch']").on("switchChange.bootstrapSwitch", function (event, state) {
		onSwitchChange(event, state);
	});
}

function onSwitchChange(event, state) {
	/*
	 * In this method body, we construct the form element to be submitted
	 * to the server.
	 * 
	 * Avoid using blocking methods because for some reason, Bootstrap
	 * Switch's "On Switch Change" event doesn't respond when something blocks
	 * it, like an alert box.
	 */
	
	var targetForm = event.currentTarget;
	var csrfProtection = document.getElementById("csrfProtection").cloneNode();
	var eventId = createNode("input", null, [["name", "eventId"], ["value", targetForm.dataset.eventId]]);
	var eventState = createNode("input", null, [["name", "state"], ["value", state]]);
	var mainForm = createForm("eventToggle", "Events", null);
	mainForm.appendChild(eventId);
	mainForm.appendChild(eventState);
	mainForm.appendChild(csrfProtection);
	
	runAjax(mainForm);
}

function enableAll() {
	$("[class='bootstrapSwitch']").bootstrapSwitch("state", true);
}

function disableAll() {
	$("[class='bootstrapSwitch']").bootstrapSwitch("state", false);
}