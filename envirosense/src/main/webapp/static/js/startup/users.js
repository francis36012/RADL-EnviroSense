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
	formButtonListeners();
	formSubmitListeners();
	
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
	
	event.target.closest("form").elements["save"].click();
}

function formButtonListeners() {
	document.getElementById("enableAll").onclick = enableAll;
	document.getElementById("disableAll").onclick = disableAll;

	var resetButtons = document.getElementsByName("revert");
	var submitButtons = document.getElementsByName("save");
	for (var index = 0; index < resetButtons.length; index++) {
		resetButtons[index].addEventListener("click", function(event) {
			var formElement = event.target.closest("form");
			formElement.reset();
		});
		
		submitButtons[index].addEventListener("click", function(event) {
			/*
			 * Since modern browsers doesn't adhere to going to pre-defined
			 * "on submit" functions, we have to create an actual submit
			 * button and append that to the form.
			 */
			var submitButton = createNode("input", null, [["type", "submit"], ["style", "display: none"]])
			var formElement = event.target.closest("form");
			formElement.appendChild(submitButton);
			submitButton.click();
			formElement.removeChild(submitButton);
		});
	};
}

function formSubmitListeners() {
	var formElements = document.getElementsByClassName("userForm");
	for (var index = 0; index < formElements.length; index++) {
		formElements[index].addEventListener("submit", function(event) {
			var csrfProtection = document.getElementById("csrfProtection").cloneNode();
			var dataChoice = createNode("input", null, [["type", "hidden"], ["name", "dataChoice"], ["value", "userData"]]);
			var mainForm = event.target;
			mainForm.appendChild(csrfProtection);
			mainForm.appendChild(dataChoice);

			runAjax(mainForm);
			mainForm.removeChild(csrfProtection);
			mainForm.removeChild(dataChoice);
		});
		
		formElements[index].onsubmit = function() { return false; };
	}
}

function enableAll() {
	$("[class='bootstrapSwitch']").bootstrapSwitch("state", true);
}

function disableAll() {
	$("[class='bootstrapSwitch']").bootstrapSwitch("state", false);
}