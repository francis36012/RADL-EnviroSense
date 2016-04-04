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
	var csrfProtection = document.getElementById("csrfProtection");
	var userId = createNode("input", null, [["name", "userId"], ["value", targetForm.dataset.userEmail]]);
	var userState = createNode("input", null, [["name", "state"], ["value", state]]);
	var mainForm = createForm("userToggle", "Users", null);
	mainForm.appendChild(userId);
	mainForm.appendChild(userState);
	mainForm.appendChild(csrfProtection);
	
	runAjax(mainForm);
}

function enableAll() {
	$("[class='bootstrapSwitch']").bootstrapSwitch("state", true);
}

function disableAll() {
	$("[class='bootstrapSwitch']").bootstrapSwitch("state", false);
}