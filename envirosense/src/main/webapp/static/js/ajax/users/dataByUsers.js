function setDataByUser(formElement) {
	var csrfProtection = formElement.csrfProtection;
	
	var userFirstName = formElement.elements["firstname"].value;
	var userLastName = formElement.elements["lastname"].value;
	var userEmail = formElement.elements["email"].value;
	var userSlack = formElement.elements["slackId"].value;
	var userPhone = formElement.elements["phone"].value;
	var userPassword = formElement.elements["password"].value;
	var userEnabled = formElement.elements["enabled"].checked ? 1 : 0;
	var reloadFlag = false;
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
	xmlHttp.open("POST", "/envirosense/admin/users/" + action, true);
	xmlHttp.setRequestHeader("X-CSRF-TOKEN", csrfProtection.value);
	xmlHttp.setRequestHeader("Content-type", "application/json");
	xmlHttp.send(JSON.stringify(userObject));
	
	if (formElement.dataChoice.value === "delete" || formElement.dataChoice.value === "create") {
		setTimeout(function() {
			window.location.reload();
		}, 1000);
	}
	
	laddaButton.setProgress(1);
	setTimeout(function() {
		laddaButton.stop();
	}, 1000);
}