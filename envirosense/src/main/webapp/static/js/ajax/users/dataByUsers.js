function setDataByUserId(formElement) {
	var stateValue = (formElement.state.value === "true") ? "active" : "inactive";
	var userId = formElement.userId.value;
	var csrfProtection = formElement.csrfProtection;
	var requestParameters = csrfProtection.name + "=" + csrfProtection.value;
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "/envirosense/api/users/" + stateValue + "/" + userId + "?" + requestParameters, true);
	xmlHttp.send();
}