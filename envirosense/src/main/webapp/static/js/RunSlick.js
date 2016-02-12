$('.single-items').slick({
	dots: true,
	infinite: false,
	arrows: false
});

/* Placeholder : MANAGE USERS */
var userElement = document.getElementsByClassName("userList");
var slickFunction = function() {
	var slideCount = $('.single-items').slick("slickCurrentSlide");
	
	$('.single-items').slick("slickAdd", userClick(this.getAttribute("id"))); 
	
	if (slideCount === 2)
		$('.single-items').slick("slickRemove", 0, false);
	
	$('.single-items').slick("slickNext");
};

for(var index = 0;
	index < userElement.length;
	index++)
{
	userElement[index].addEventListener("click", slickFunction);
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
	
	var panelBody = document.createElement("div");
	panelBody.classList.add("panel-body");
	
	var form = document.createElement("form");
	form.setAttribute("role", "form");

	var fieldset = document.createElement("fieldset");
	fieldset.classList.add("input-group-vertical");

	var div1= document.createElement("div");
	div1.classList.add("form-group");

	var firstName = document.createElement("input");
	firstName.setAttribute("value", userInfo[0]);
	firstName.classList.add("form-control");

	var firstNameLabel = document.createElement("div");
	firstNameLabel.classList.add("text-right");
	firstNameLabel.innerHTML = "First Name";
	
	var lastName = document.createElement("input");
	lastName.setAttribute("value", userInfo[1]);
	lastName.classList.add("form-control");
	
	var lastNameLabel = document.createElement("div");
	lastNameLabel.classList.add("text-right");
	lastNameLabel.innerHTML = "Last Name";

	var email = document.createElement("input");
	email.setAttribute("value", userInfo[2]);
	email.classList.add("form-control");

	var emailLabel = document.createElement("div");
	emailLabel.classList.add("text-right");
	emailLabel.innerHTML = "Email";
	
	panelHead.innerHTML = userInfo[0] + " " + userInfo[1];
	div1.appendChild(firstName);
	div1.appendChild(firstNameLabel);
	div1.innerHTML += "<br />";
	
	div1.appendChild(lastName);
	div1.appendChild(lastNameLabel);
	div1.innerHTML += "<br />";
	
	div1.appendChild(email);
	div1.appendChild(emailLabel);
	div1.innerHTML += "<br />";
	
	fieldset.appendChild(div1);
	form.appendChild(fieldset);
	panelBody.appendChild(form);
	panelDiv.appendChild(panelHead);
	panelDiv.appendChild(panelBody);
	colDiv.appendChild(panelDiv);
	rowDiv.appendChild(colDiv);
	
	return rowDiv;
}