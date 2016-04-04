/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function setDataByUserId(formElement) {
	var stateValue = (formElement.state.value === "true") ? "enable" : "disable";
	var eventId = formElement.eventId.value;
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "/envirosense/api/users/" + stateValue + "/" + eventId, true);
	xmlHttp.send();
}