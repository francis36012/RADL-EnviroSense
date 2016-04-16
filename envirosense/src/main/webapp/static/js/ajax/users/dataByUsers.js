function setDataByUser(formElement) {
	var action;
	switch (formElement.dataChoice.value) {
		case "createUser":
			action = "save";
			formElement.dataChoice.value = "create";
			break;
		case "saveUser":
			action = "update";
			formElement.dataChoice.value = "save";
			break;
		case "deleteUser":
			action = "delete";
			formElement.dataChoice.value = "delete";
			break;
	}
	
	var laddaButton = formElement.getElementsByTagName("a")[formElement.dataChoice.value];
	laddaButton = Ladda.create(laddaButton);
	laddaButton.start();
	
	formElement = formElement.cloneNode(true);
	
	var csrfProtection = formElement.csrfProtection;
	var userFirstName = formElement.elements["firstname"].value;
	var userLastName = formElement.elements["lastname"].value;
	var userEmail = formElement.elements["email"].value;
	var userSlack = formElement.elements["slackId"].value;
	var userPhone = formElement.elements["phone"].value;
	var userPassword = formElement.elements["password"].value;
	var userEnabled = formElement.elements["enabled"].checked ? 1 : 0;
	
	laddaButton.setProgress(.3);
	
	var userObject = {
		firstname: userFirstName,
		lastname: userLastName,
		email: userEmail,
		phone: userPhone,
		slackId: userSlack,
		password: userPassword,
		enabled: userEnabled
	};
	
	laddaButton.setProgress(.6);
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		onReadyStateChangeByUsers(xmlHttp, formElement, laddaButton);
	};
	
	xmlHttp.open("POST", "/envirosense/admin/users/" + action, true);
	xmlHttp.setRequestHeader("X-CSRF-TOKEN", csrfProtection.value);
	xmlHttp.setRequestHeader("Content-type", "application/json");
	xmlHttp.send(JSON.stringify(userObject));
}

function onReadyStateChangeByUsers(xmlHttp, formElement, laddaButton) {
	try {
		/*
		 * HTTP States
		 * 
		 * 0: Hasn't started 
		 * 1: Connected to the Server 
		 * 2: Server has received our request 
		 * 3: Server is processing 
		 * 4: Request is finished and data is ready
		 */
		if (xmlHttp.status === 200) {

			if (xmlHttp.readyState === 4) {
				laddaButton.setProgress(1);
				window.location.reload();
			}
		} else if (xmlHttp.status !== 0) {
			laddaButton.setProgress(0);
			setTimeout(function() {
				laddaButton.stop();
			}, 300);
			
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
	} catch (errorEvent) {
		throw errorEvent;
	}
}