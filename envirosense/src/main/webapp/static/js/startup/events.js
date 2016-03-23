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
		if (event.type === "switchChange") {
			onSwitchChange(event, state);
		}
	});
}

function onSwitchChange(event, state) {
	/*
	 * Avoid using blocking methods because for some reason, Bootstrap
	 * Switch's "On Switch Change" event doesn't respond when something blocks
	 * it, like an alert box.
	 */
	var targetForm = event.currentTarget.form;
	var eventId = createNode("input", ["value", targetForm.dataset.eventId], [["name", "eventId"]]);
	var eventState = createNode("input", ["value", state], [["name", "state"]]);
	var mainForm = createForm("eventToggle", "Events", null);
	mainForm.appendChild(eventId);
	mainForm.appendChild(eventState);
	
	runAjax(mainForm);
}

function enableAll() {
	$("[class='bootstrapSwitch']").bootstrapSwitch("state", true);
}

function disableAll() {
	$("[class='bootstrapSwitch']").bootstrapSwitch("state", false);
}