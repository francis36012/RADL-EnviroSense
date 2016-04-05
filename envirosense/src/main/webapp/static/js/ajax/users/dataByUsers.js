function setDataByUser(formElement) {
	var csrfProtection = formElement.csrfProtection;
	
	var userFirstName = formElement.elements["firstname"].value;
	var userLastName = formElement.elements["lastname"].value;
	var userEmail = formElement.elements["email"].value;
	var userSlack = formElement.elements["slackId"].value;
	var userPhone = formElement.elements["phone"].value;
	var userEnabled = formElement.elements["enabled"].checked ? true : false;
	
	var userObject = {
		firstname: userFirstName,
		lastname: userLastName,
		email: userEmail,
		phone: userPhone,
		slackId: userSlack,
		enabled: userEnabled
	}
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "/envirosense/admin/users/save", true);
	xmlHttp.setRequestHeader("X-CSRF-TOKEN", csrfProtection.value);
	xmlHttp.send(JSON.stringify(userObject));
}