function setDataByEventId(formElement) {
	var stateValue = (formElement.state.value === "true") ? "enable" : "disable";
	var eventId = formElement.eventId.value;
	var csrfProtection = formElement.csrfProtection;
	var requestParameters = csrfProtection.name + "=" + csrfProtection.value;
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "/envirosense/api/event/" + stateValue + "/" + eventId + "?" + requestParameters, true);
	xmlHttp.send();
}