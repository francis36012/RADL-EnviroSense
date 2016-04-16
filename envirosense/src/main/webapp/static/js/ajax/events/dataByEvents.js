function setDataByEventId(formElement) {
	var stateValue = (formElement.state.value === "true") ? "enable" : "disable";
	var eventId = formElement.eventId.value;
	var csrfProtection = formElement.csrfProtection;
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		onReadyStateChangeByEvents(xmlHttp);
	};
	xmlHttp.open("POST", "/envirosense/api/event/" + stateValue + "/" + eventId, true);
	xmlHttp.setRequestHeader("X-CSRF-TOKEN", csrfProtection.value);
	xmlHttp.send();
}

function onReadyStateChangeByEvents(xmlHttp) {
	/*
	 * HTTP States
	 * 
	 * 0: Hasn't started 
	 * 1: Connected to the Server 
	 * 2: Server has received our request 
	 * 3: Server is processing 
	 * 4: Request is finished and data is ready
	 */
	if (xmlHttp.status !== 0) {
		
		var errorTitle = document.getElementById("popupMessage").getElementsByClassName("modal-title")[0];
		errorTitle.innerHTML = "";
		errorTitle.appendChild(document.createTextNode("Something went wrong..."));

		var errorMessage = document.getElementsByClassName("modal-body")[0];
		errorMessage.innerHTML = "";
		errorMessage.appendChild(document.createTextNode("Please contact administrator."));

		var toAppend = createNode("h3", ["well", "well-sm", "text-center"], null);
		switch(xmlHttp.status) {
			case 403:
				toAppend.appendChild(document.createTextNode("Status 403 - Forbidden"));
				break;
			case 404:
				toAppend.appendChild(document.createTextNode("Status 404 - Not Found"));
				break;
			case 500:
				toAppend.appendChild(document.createTextNode("Status 500 - Internal Server Error"));
				break;
		}

		errorMessage.appendChild(toAppend);
		$("#popupMessage").modal("show");
	}
}