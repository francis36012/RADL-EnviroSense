function setDataByUser(formElement) {
	var action;
	switch (formElement.dataChoice.value) {
		case "createUser":
			action = "save";
			formElement.dataChoice.value = "create";
			break;
		case "saveUser":
			action = "save";
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
				
				if (formElement.dataChoice.value === "delete" || formElement.dataChoice.value === "create") {
					window.location.reload();
				}
				
				laddaButton.setProgress(1);
				setTimeout(function() {
					laddaButton.stop();
				}, 500);
			}
		} else if (xmlHttp.status === 404) {
			var errorPanel = document.getElementById("errorMessage");
			if (!errorPanel) {
				errorPanel= document.createPanel();
				errorPanel.setAttribute("id", "errorMessage");
			}
			
			var errorMessage = createNode("div", ["well", "well-sm"], null);
			errorMessage.innerHTML = "Something went wrong. 404 Not found.";
			errorPanel.getElementsByClassName("panel-body")[0].appendChild(errorMessage);
			document.body.appendChild(errorPanel);
			
			laddaButton.setProgress(1);
			setTimeout(function() {
				laddaButton.stop();
			}, 500);
		} else if (xmlHttp.statux === 500) {
			var errorPanel = document.getElementById("errorMessage");
			if (!errorPanel) {
				errorPanel= document.createPanel();
				errorPanel.setAttribute("id", "errorMessage");
			}
			
			var errorMessage = createNode("div", ["well", "well-sm"], null);
			errorMessage.innerHTML = "Something went wrong. Interval server error. Please contact administrator.";
			errorPanel.getElementsByClassName("panel-body")[0].appendChild(errorMessage);
			document.body.appendChild(errorPanel);
			
			laddaButton.setProgress(1);
			setTimeout(function() {
				laddaButton.stop();
			}, 500);
		}
	} catch (errorEvent) {
		throw errorEvent;
	}
}