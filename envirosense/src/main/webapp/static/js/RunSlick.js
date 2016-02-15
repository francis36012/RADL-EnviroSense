$('.single-items').slick({
	dots: true,
	infinite: false,
	arrows: false,
	speed: 250,
	initialSlide: 1
});

var usersElement = document.getElementsByClassName("usersList");
var eventsElement = document.getElementsByClassName("eventsList");

if (usersElement != null) {
	var slickFunction = function() {
		var slideCount = $('.slick-slide').length;
		
		if (slideCount >= 3)
			$('.single-items').slick("slickRemove", false);
		
		$('.single-items').slick("slickAdd", userClick(this.getAttribute("id"))); 
		$('.single-items').slick("slickNext");
	};

	for(var index = 0;
		index < usersElement.length;
		index++)
	{
		usersElement[index].addEventListener("click", slickFunction);
	}
}

if (eventsElement != null) {
	var slickFunction = function() {
		var slideCount = $('.slick-slide').length;
		
		if (slideCount >= 3)
			$('.single-items').slick("slickRemove", false);

		$('.single-items').slick("slickAdd", eventClick(this.getAttribute("id"))); 
		$('.single-items').slick("slickNext");
	};

	for(var index = 0;
		index < eventsElement.length;
		index++)
	{
		eventsElement[index].addEventListener("click", slickFunction);
	}
}

function userClick(user) {
	switch(user) {
		case "StephanieKraus":
			var userInfo = [
				"Stephanie",
				"Krause",
				"Stephanie.Krause@edu.sait.ca"
			];
			
			break;
			
		case "SergioDiaz":
			var userInfo = [
				"Sergio",
				"Diaz",
				"Sergio.DiazChavez.sait.ca"
			];
			
			break;
			
		case "BrenoBrezinski":
			var userInfo = [
				"Breno",
				"Brezinski",
				"Breno.Brezinski@edu.sait.ca"
			];
			
			break;
			
		case "DanielChau":
			var userInfo = [
				"Daniel",
				"Chau",
				"Daniel.Chau@edu.sait.ca"
			];
			
			break;
			
		case "FrancisAgyapong":
		var userInfo = [
			"Francis",
			"Agyapong",
			"Francis.Agyapong@edu.sait.ca"
		];

			break;
		
		case "JediahDizon":
			var userInfo = [
				"Jediah",
				"Dizon",
				"Jediah.Dizon@edu.sait.ca"
			];
			
			break;
			
		default:
			var userInfo = [
				"Someone",
				"Somewhere",
				"Someone@edu.sait.ca"
			];
	}
	
	return createUserSlide(userInfo);
}

function createUserSlide(userInfo)
{
	var rowDiv = document.createElement("div");
	rowDiv.classList.add("row");
	
	var colDiv = document.createElement("div");
	colDiv.classList.add("col-xs-12");
	
	var panelDiv = document.createElement("div");
	panelDiv.classList.add("panel");
	panelDiv.classList.add("panel-default");
	
	var panelHead = document.createElement("div");
	panelHead.classList.add("panel-heading");
	panelHead.classList.add("text-center");
	panelHead.innerHTML = userInfo[0] + " " + userInfo[1];
	
	var panelBody = document.createElement("div");
	panelBody.classList.add("panel-body");
	
	var form = document.createElement("form");
	form.classList.add("form");
	form.setAttribute("role", "form");

	var fieldset = document.createElement("fieldset");
	fieldset.classList.add("input-group-vertical");

	var div1= document.createElement("div");
	div1.classList.add("form-group");

	var firstName = document.createElement("input");
	firstName.setAttribute("value", userInfo[0]);
	firstName.classList.add("form-control");
	firstName.classList.add("input-lg");
	firstName.classList.add("nopadding");

	var firstNameLabel = document.createElement("div");
	firstNameLabel.classList.add("text-right");
	firstNameLabel.classList.add("text-muted");
	firstNameLabel.innerHTML = "First Name";
	
	var lastName = document.createElement("input");
	lastName.setAttribute("value", userInfo[1]);
	lastName.classList.add("form-control");
	lastName.classList.add("input-lg");
	lastName.classList.add("nopadding");
	
	var lastNameLabel = document.createElement("div");
	lastNameLabel.classList.add("text-right");
	lastNameLabel.classList.add("text-muted");
	lastNameLabel.innerHTML = "Last Name";

	var email = document.createElement("input");
	email.setAttribute("value", userInfo[2]);
	email.classList.add("form-control");
	email.classList.add("input-lg");
	email.classList.add("nopadding");

	var emailLabel = document.createElement("div");
	emailLabel.classList.add("text-right");
	emailLabel.classList.add("text-muted");
	emailLabel.innerHTML = "Email";
	
	
	div1.appendChild(firstName);
	div1.appendChild(firstNameLabel);
	
	div1.appendChild(lastName);
	div1.appendChild(lastNameLabel);
	
	div1.appendChild(email);
	div1.appendChild(emailLabel);
	
	fieldset.appendChild(div1);
	form.appendChild(fieldset);
	panelBody.appendChild(form);
	panelDiv.appendChild(panelHead);
	panelDiv.appendChild(panelBody);
	colDiv.appendChild(panelDiv);
	rowDiv.appendChild(colDiv);
	
	return rowDiv;
}

function eventClick(event) {
	switch(event) {
		case "TemperatureWarning":
			var eventInfo = [
				"Temperature",
				"Moderate",
				"Whenever the temperature reaches 16 degrees, a notification\n\
				is sent to the user."
			];
			
			break;
			
		case "HumidityCaution":
			var eventInfo = [
				"Humidity",
				"Light",
				"When it becomes humid for ober 40%, a notification is sent \n\
				to the user"
			];
			
			break;
			
		case "AllergensWarning":
			var eventInfo = [
				"Allergens",
				"Severe",
				"Alerts users by notifying them that there are allergens present\n\
				in the office."
			];
			
			break;
			
		case "CameraAlarm":
			var eventInfo = [
				"Camera",
				"Severe",
				"Immidiately notifies the uers that there are movement detected \n\
				in the office after hours."
			];
			
			break;
		default:
			var eventInfo = [
				"Unknown",
				"Undefined",
				"N/A"
			];
	}
	
	return createEventSlide(eventInfo);
}

function createEventSlide(eventInfo) {
	var rowDiv = document.createElement("div");
	rowDiv.classList.add("row");
	
	var colDiv = document.createElement("div");
	colDiv.classList.add("col-xs-12");
	
	var panelDiv = document.createElement("div");
	panelDiv.classList.add("panel");
	panelDiv.classList.add("panel-default");
	
	var panelHead = document.createElement("div");
	panelHead.classList.add("panel-heading");
	panelHead.classList.add("text-center");
	panelHead.innerHTML = eventInfo[0];
	
	var panelBody = document.createElement("div");
	panelBody.classList.add("panel-body");
	
	var form = document.createElement("form");
	form.classList.add("form");
	form.setAttribute("role", "form");
	
	var fieldset = document.createElement("fieldset");
	fieldset.classList.add("input-group-vertical");

	var div1= document.createElement("div");
	div1.classList.add("form-group");

	var eventName = document.createElement("input");
	eventName.setAttribute("value", eventInfo[0] + " " + eventInfo[1]);
	eventName.classList.add("form-control");
	eventName.classList.add("input-lg");
	
	var descriptionDiv = document.createElement("div");
	descriptionDiv.classList.add("well");
	descriptionDiv.classList.add("well-sm");
	
	var eventDescription = document.createElement("div");
	eventDescription.classList.add("text-muted");
	eventDescription.innerHTML = eventInfo[2];
	
	descriptionDiv.appendChild(eventDescription);
	div1.appendChild(eventName);
	div1.innerHTML += "<hr />";
	div1.appendChild(descriptionDiv);
	
	fieldset.appendChild(div1);
	form.appendChild(fieldset);
	panelBody.appendChild(form);
	panelDiv.appendChild(panelHead);
	panelDiv.appendChild(panelBody);
	colDiv.appendChild(panelDiv);
	rowDiv.appendChild(colDiv);
	
	return rowDiv;
}