function setDataByEventId(formElement) {
	var stateValue = (formElement.state.value === "true") ? "enable" : "disable";
	var eventId = formElement.eventId.value;
	var csrfProtection = formElement.csrfProtection;
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "/envirosense/api/event/" + stateValue + "/" + eventId, true);
	xmlHttp.setRequestHeader("X-CSRF-TOKEN", csrfProtection.value);
	xmlHttp.send();
}