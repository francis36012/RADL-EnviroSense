/**
 * Startup Sequence will contain Javascript functions that will initialize the
 * DOM elements for the HTML like making button listeners and handling form
 * submits.
 */

/**
 * Add "On Submit" events for the forms in the reports page.
 */
var reportForms = document.getElementsByClassName("reportForm");
var reportButtons = document.getElementsByClassName("reportButton");
for (var index = 0; index < reportForms.length; index++) {
	reportForms[index].onsubmit = function () {
		runAjax(reportButtons[index]);
		return false;
	};
};