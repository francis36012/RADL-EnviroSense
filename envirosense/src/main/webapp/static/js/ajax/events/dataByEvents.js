/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function setDataByEventId(formElement) {
	var stateValue = (formElement.state.value === "true") ? "enable" : "disable";
	var eventId = formElement.eventId.value;
	var csrfProtection = formElement.csrfProtection;
	var requestParameters = csrfProtection.name + "=" + csrfProtection.value;
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "/envirosense/api/event/" + stateValue + "/" + eventId + "?" + requestParameters, true);
	xmlHttp.send();
}