function setDataByUser(formElement) {
	var csrfProtection = formElement.csrfProtection;
	
	var userFirstName = formElement.elements["firstname"].value;
	var userLastName = formElement.elements["lastname"].value;
	var userEmail = formElement.elements["email"].value;
	var userSlack = formElement.elements["slackId"].value;
	var userPhone = formElement.elements["phone"].value;
	var userPassword = formElement.elements["password"].value;
	var userEnabled = formElement.elements["enabled"].checked ? 1 : 0;
	var action;
	
	switch (formElement.dataChoice.value) {
		case "saveUser":
			action = "save";
			break;
		case "deleteUser":
			action = "delete";
			break;
	}
	
	var userObject = {
		firstname: userFirstName,
		lastname: userLastName,
		email: userEmail,
		phone: userPhone,
		slackId: userSlack,
		password: userPassword,
		enabled: userEnabled
	}
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "/envirosense/admin/users/" + action, true);
	xmlHttp.setRequestHeader("X-CSRF-TOKEN", csrfProtection.value);
	xmlHttp.setRequestHeader("Content-type", "application/json");
	xmlHttp.send(JSON.stringify(userObject));
}