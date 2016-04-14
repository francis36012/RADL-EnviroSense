/**
 * Initialize Google Charts. A check is used before initializing to make
 * sure that there is connectivity to the Google Charts API.
 */
if (window.google) {
	try {
		google.charts.load('current', {
			packages: ['corechart', 'line']
		});
	} catch (errorEvent) {
		console.error("Cannot connect to Google Charts.\n---\n" + errorEvent);
	}
}


/*
 * Utilities that are necessaryr to display data to the user. It includes 
 * the creation of DOM Elements, and getting Sensor Name by ID.
 * 
 */

function createNode(tagName, className, attributeValues) {
	var newElement = document.createElement(tagName);

	if (className !== undefined && className !== null) {
		for(var index = 0;
			index < className.length;
			index++) {
				newElement.classList.add(className[index]);
			}
	}

	if (attributeValues !== undefined && attributeValues !== null)
	{
		for(var outerIndex = 0;
			outerIndex < attributeValues.length;
			outerIndex++) {

				for(var innerIndex = 0;
					innerIndex < attributeValues[outerIndex].length;
					innerIndex++) {
				newElement.setAttribute(attributeValues[outerIndex][0], attributeValues[outerIndex][innerIndex]);
			}
		}
	}

	return newElement;
}

/* ---------------------------------------- */
/*			PLUGIN INITIALIZATION			*/
/* ---------------------------------------- */
function runSlick() {
	
	$('.single-items').slick({
		dots: true,
		infinite: false,
		arrows: true,
		speed: 250,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
		{
			breakpoint: 1024,
			settings: {
				arrows: false,
				slidesToShow: 3,
				slidesToScroll: 3
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				slidesToShow: 2,
				slidesToScroll: 2
			}
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	});
}

function runNavbar() { 
	$("#menu-toggle").click(
	function(e) 
	{
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});
}

function runBootstrapSwitch() {
	$("[class='bootstrapSwitch']").bootstrapSwitch();
}

function runJqueryUI() {
	$(function() {
		$("[type=datetime-local]" ).datepicker();
	});
	
	$( "#format" ).change(function() {
      $( "#datepicker" ).datepicker( "option", "dateFormat", $( this ).val() );
    });
}


/* ---------------------------------------- */
/*			CONTAINER CREATION				*/
/* ---------------------------------------- */
function createForm(dataChoice, dataCategory, dataType) {
	var mainForm = createNode("form", ["form"], null);
	
	if (dataChoice !== undefined && dataChoice !== null) {
		var hiddenInput1 = createNode("input", null, [["name", "dataChoice"], ["value", dataChoice], ["type", "text"]]);
		mainForm.appendChild(hiddenInput1);
	}
	
	if (dataCategory !== undefined && dataCategory !== null) {
		var hiddenInput2 = createNode("input", null, [["name", "category"], ["value", dataCategory], ["type", "text"]]);
		mainForm.appendChild(hiddenInput2);
	}
	
	if (dataType !== undefined && dataType !== null) {	
		var hiddenInput3 = createNode("input", null, [["name", "type"], ["value", dataType], ["type", "text"]]);
		mainForm.appendChild(hiddenInput3);
	}
	
	return mainForm;
}

/*
function createContainerByPageSettings(webPage) {
	switch (webPage) {
		case "reportSettings":
			var settingsContainerRow1 = createNode("div", ["row"], null);
			var settingsContainerRow1Col1 = createNode("div", ["col-xs-12"], null);
			
			var settingsContainerRow2 = createNode("div", ["row", "form-group"], null);
			var settingsContainerRow2Col1 = createNode("div", ["col-xs-10", "col-xs-offset-1"], null);
			var settingsForm = createNode("form", ["form", "form-horizontal"], [["id", "reportForm"], ["role", "form"]]);
			var settingsAnchorToggle = createNode("button", ["btn", "btn-default", "btn-block"], [["data-toggle", "dropdown"], ["name", "dataType"]]);
			var settingsHiddenCategory = createNode("input", null, [["type", "hidden"], ["name", "dataChoice"]]);
			var settingsUnorderedList = createNode("ul", ["dropdown-menu", "btn-block"], null);
			
			var settingsContainerRow3 = createNode("div", ["row", "form-group"], null);
			var settingsContainerRow3Col1 = createNode("div", ["col-xs-10"], null);
			var settingsLabel1 = createNode("label", ["col-xs-2", "control-label"], null);
			var settingsInput1 = createNode("input", ["form-control"], [["type", "datetime-local"]]);
			settingsLabel1.innerHTML = "From";
			
			var settingsContainerRow4 = createNode("div", ["row", "form-group"], null);
			var settingsLabel2 = createNode("label", ["col-xs-2", "control-label"], null);
			var settingsContainerRow4Col1 = createNode("div", ["col-xs-10"], null);
			var settingsInput2 = createNode("input", ["form-control"], [["type", "datetime-local"]]);
			settingsLabel2.innerHTML = "To"
			
			var settingsContainerRow5 = createNode("div", ["row", "form-group"], null);
			var settingsContainerRow5Col1 = createNode("div", ["col-xs-4", "col-xs-offset-8"], null);
			var settingsSubmit = createNode("button", ["btn", "btn-default", "btn-block", "ladda-button"], [["type", "submit"], ["name", "submitButton"], ["data-style", "slide-down"], ["data-spinner-color", "#333"]]);
			settingsSubmit.innerHTML = "Submit";
			
			settingsContainerRow5Col1.appendChild(settingsSubmit);
			settingsContainerRow5.appendChild(settingsContainerRow5Col1);
			
			settingsContainerRow4Col1.appendChild(settingsInput2);
			settingsContainerRow4.appendChild(settingsLabel2);
			settingsContainerRow4.appendChild(settingsContainerRow4Col1);
			
			settingsContainerRow3Col1.appendChild(settingsInput1);
			settingsContainerRow3.appendChild(settingsLabel1);
			settingsContainerRow3.appendChild(settingsContainerRow3Col1);
			
			settingsContainerRow2Col1.appendChild(settingsAnchorToggle);
			settingsContainerRow2Col1.appendChild(settingsHiddenCategory);
			settingsContainerRow2Col1.appendChild(settingsUnorderedList);
			settingsContainerRow2.appendChild(settingsContainerRow2Col1);
			
			settingsForm.appendChild(settingsContainerRow2);
			settingsForm.appendChild(settingsContainerRow3);
			settingsForm.appendChild(settingsContainerRow4);
			settingsForm.appendChild(settingsContainerRow5);
			
			settingsContainerRow1Col1.appendChild(settingsForm);
			settingsContainerRow1.appendChild(settingsContainerRow1Col1);
			
			return settingsContainerRow1;
			break;
			
		case "liveDataSettings":
			var settingsContainerRow1 = createNode("div", ["row"], null);
			var settingsContainerRow1Col1 = createNode("div", ["col-xs-12"], null);
			
			var settingsContainerRow2 = createNode("div", ["row", "form-group"], null);
			var settingsContainerRow2Col1 = createNode("div", ["col-xs-6"], null);
			var settingsContainerRow2Col2 = createNode("div", ["col-xs-6"], null);
			
			var sensorsForm = createForm("liveData", "Sensors", "all");
			var sensorsButton = createNode("input", ["btn", "btn-default", "btn-block"], [["name", "dataChoice"], ["type", "button"], ["value", "Sensors"]]);
			sensorsForm.appendChild(sensorsButton);
			
			var roomsForm = createForm("liveData", "Rooms", "all");
			var roomsButton = createNode("input", ["btn", "btn-default", "btn-block"], [["name", "dataChoice"], ["type", "button"], ["value", "Rooms"]]);
			roomsForm.appendChild(roomsButton);
			
			settingsContainerRow2Col1.appendChild(sensorsForm);
			settingsContainerRow2Col1.appendChild(roomsForm);
			settingsContainerRow2.appendChild(settingsContainerRow2Col1);
			settingsContainerRow2.appendChild(settingsContainerRow2Col2);
			settingsContainerRow1Col1.appendChild(settingsContainerRow2);
			settingsContainerRow1.appendChild(settingsContainerRow1Col1);
			
			return settingsContainerRow1;
			break;
			
		default:
			break;
	}
	
	return settingsContainerRow1;
}
*/
function createContainerBySensorType() {
	/*
	 * For the "Sensor By Type" JSON object, the format would be:
	 * 1.]	id
	 * 2.]	sensorType
	 * 3.]	timestamp
	 * 4.]	data
	 * 
	 * For this script, we are going for the format:
	 * 1.]	sensorId
	 * 2.]	sensorType
	 * 3.]	vaules
	 *		i.	timestamp
	 *		ii.	data
	 */
	
	var rowDiv = createNode("div", ["row"], null);
	var colDiv = createNode("div", ["col-xs-12"], null);
	var panelDiv = createNode("div", ["panel", "panel-default"], null);
	var panelHead = createNode("div", ["panel-heading", "text-center"], null);
	var panelBody = createNode("div", ["panel-body"], null);
	
	var h1 = createNode("h1", null, null);
	var small = createNode("small", null, null);
	
	var sensorData = createNode("div", ["dataContainer"], null);
	var sensorId = createNode("div", ["sensorId"], null);
	var roomName = createNode("div", ["roomName"], null);
	var roomDescription = createNode("div", ["roomDescription"], null);
	var sensorName = createNode("div", ["sensorName"], null);
	var sensorType = createNode("div", ["sensorType"], null);
	var sensorTime = createNode("div", ["sensorTime"], null);
	var sensorValue = createNode("div", ["sensorValue"], null);
	
	var horizontalLine = createNode("hr", null, null);
	
	sensorData.appendChild(sensorValue);
	sensorData.appendChild(sensorId);
	sensorData.appendChild(sensorName);
	sensorData.appendChild(sensorType);
	sensorData.appendChild(roomName);
	sensorData.appendChild(roomDescription);
	sensorData.appendChild(horizontalLine);
	sensorData.appendChild(sensorTime);
	panelBody.appendChild(sensorData);
	panelDiv.appendChild(panelHead);
	panelDiv.appendChild(panelBody);
	
	colDiv.appendChild(panelDiv);
	rowDiv.appendChild(colDiv);
	
	return rowDiv;
}

function createContainerByAllSensors() {
	/*
	 * For the "Report" JSON object, the pattern would be:
	 *	1.]	id
	 *	2.]	room
	 *		i.		id
	 *		ii.		name
	 *		iii.	description
	 *	3.] name
	 *	4.] sensorType
	 */
	var rowDiv = createNode("div", ["row"], null);
	var colDiv = createNode("div", ["col-xs-12"], null);
	var panelDiv = createNode("div", ["panel", "panel-default"], null);
	var panelHead = createNode("div", ["panel-heading", "text-center"], null);
	var panelBody = createNode("div", ["panel-body"], null);
	
	var sensorData = createNode("div", ["dataContainer"], null);
	var sensorId = createNode("div", ["sensorId"], null);
	var sensorName = createNode("div", ["sensorName"], null);
	var sensorType = createNode("div", ["sensorType"], null);
	var sensorRoom = createNode("div", null, null);
	
	var roomHeading = createNode("h5", null, null);
	var roomData = createNode("div", ["roomData", "well", "well-sm"], null);
	var roomId = createNode("div", ["roomId"], null);
	var roomName = createNode("div", ["roomName"], null);
	var roomDescription = createNode("div", ["roomDescription"], null);
	
	roomHeading.innerHTML = "Room Data";
	roomData.appendChild(roomId);
	roomData.appendChild(roomName);
	roomData.appendChild(roomDescription);
	
	sensorRoom.appendChild(roomData);
	sensorData.appendChild(sensorId);
	sensorData.appendChild(sensorName);
	sensorData.appendChild(sensorType);
	sensorData.appendChild(roomHeading);
	sensorData.appendChild(sensorRoom);
	sensorData.innerHTML += "<hr />";
	
	panelBody.appendChild(sensorData);
	panelDiv.appendChild(panelHead);
	panelDiv.appendChild(panelBody);
	
	colDiv.appendChild(panelDiv);
	rowDiv.appendChild(colDiv);
	
	return rowDiv;
}


function createContainerByRoomId() {
	/*
	 * For the "Sensor By Type" JSON object, the format would be:
	 * 1.]	id
	 * 2.]	roomType
	 * 3.]	timestamp
	 * 4.]	data
	 * 
	 * For this script, we are going for the format:
	 * 1.]	roomId
	 * 2.]	roomType
	 * 3.]	vaules
	 *		i.	timestamp
	 *		ii.	data
	 */
	
	var rowDiv = createNode("div", ["row"], null);
	var colDiv = createNode("div", ["col-xs-12"], null);
	var panelDiv = createNode("div", ["panel", "panel-default"], null);
	var panelHead = createNode("div", ["panel-heading", "text-center"], null);
	var panelBody = createNode("div", ["panel-body"], null);
	
	var sensorData = createNode("div", ["dataContainer"], null);
	var sensorId = createNode("div", ["sensorId"], null);
	var sensorName = createNode("div", ["sensorName"], null);
	var sensorType = createNode("div", ["sensorType"], null);
	var sensorTime = createNode("div", ["sensorTime"], null);
	var sensorValue = createNode("div", ["sensorValue"], null);
	var roomName = createNode("div", ["roomName"], null);
	var roomDescription = createNode("div", ["roomDescription"], null);
	
	var horizontalLine = createNode("hr", null, null);
	
	sensorData.appendChild(sensorId);
	sensorData.appendChild(sensorName);
	sensorData.appendChild(sensorType);
	sensorData.appendChild(roomName);
	sensorData.appendChild(roomDescription);
	sensorData.appendChild(horizontalLine);
	sensorData.appendChild(sensorTime);
	sensorData.appendChild(sensorValue);
	panelBody.appendChild(sensorData);
	panelDiv.appendChild(panelHead);
	panelDiv.appendChild(panelBody);
	
	colDiv.appendChild(panelDiv);
	rowDiv.appendChild(colDiv);
	
	return rowDiv;
}


function createContainerByAllRooms() {
	/*
	 * For the "Report" JSON object, the pattern would be:
	 *	1.]	id
	 *	2.]	room
	 *		i.		id
	 *		ii.		name
	 *		iii.	description
	 *	3.] name
	 *	4.] roomType
	 */
	var rowDiv = createNode("div", ["row"], null);
	var colDiv = createNode("div", ["col-xs-12"], null);
	var panelDiv = createNode("div", ["panel", "panel-default"], null);
	var panelHead = createNode("div", ["panel-heading", "text-center"], null);
	var panelBody = createNode("div", ["panel-body"], null);
	
	var roomData = createNode("div", ["dataContainer"], null);
	var roomId = createNode("div", ["roomId"], null);
	var roomName = createNode("div", ["roomName"], null);
	var roomType = createNode("div", ["roomType"], null);
	var roomRoom = createNode("div", null, null);
	
	var roomHeading = createNode("h5", null, null);
	var roomData = createNode("div", ["roomData", "well", "well-sm"], null);
	var roomId = createNode("div", ["roomId"], null);
	var roomName = createNode("div", ["roomName"], null);
	var roomDescription = createNode("div", ["roomDescription"], null);
	
	roomHeading.innerHTML = "Room Data";
	roomData.appendChild(roomId);
	roomData.appendChild(roomName);
	roomData.appendChild(roomDescription);
	
	roomRoom.appendChild(roomData);
	roomData.appendChild(roomId);
	roomData.appendChild(roomName);
	roomData.appendChild(roomType);
	roomData.appendChild(roomHeading);
	roomData.appendChild(roomRoom);
	roomData.innerHTML += "<hr />";
	
	panelBody.appendChild(roomData);
	panelDiv.appendChild(panelHead);
	panelDiv.appendChild(panelBody);
	
	colDiv.appendChild(panelDiv);
	rowDiv.appendChild(colDiv);
	
	return rowDiv;
}

function createSlickSlideContainer() {
	var contentDiv = createNode("div", ["single-items"], null);
	
	return contentDiv;
}

function createPanel() {
	var rowDiv = createNode("div", ["row"], null);
	var colDiv = createNode("div", ["col-xs-12"], null);
	var panelDiv = createNode("div", ["panel", "panel-default"], null);
	var panelHead = createNode("div", ["panel-heading", "text-center"], null);
	var panelBody = createNode("div", ["panel-body"], null);
	
	panelDiv.appendChild(panelHead);
	panelDiv.appendChild(panelBody);

	colDiv.appendChild(panelDiv);
	rowDiv.appendChild(colDiv);
	
	return rowDiv;
}

function clearPanels(slickPanels) {
	
	if (slickPanels === null) {
		var panelElements = document.getElementsByClassName("dataContainer");
		for (var index = 0; index < panelElements.length; index++) {
			for (var innerIndex = 0; innerIndex < panelElements[index].childNodes.length; innerIndex++) {
				panelElements[index].childNodes[innerIndex].innerHTML = "";
			}
		}
	} else {
		for (var index = 0; index < slickPanels.length; index++) {
			for (var innerIndex = 0; innerIndex < slickPanels[index].childNodes.length; innerIndex++) {
				slickPanels[index].childNodes[innerIndex].innerHTML = "";
			}
		}
	}
}

function getSensorNameByType(sensorType) {
	var returnValue;
	switch (sensorType)
	{
		case "TE":
			returnValue = "Temperature";
			break;
		case "HU":
			returnValue = "Humidity";
			break;
		case "MO":
			returnValue = "Motion";
			break;
		case "DR":
			returnValue = "Door";
			break;
		case "RA":
			returnValue = "Reely Active";
			break;
		default:
			returnValue = "";
			console.error("Warning: Sensor name for Type \"" + sensorType + "\" unknown.");
	}
	return returnValue;
}

function getSensorTypeByName(sensorName) {
	var returnValue;
	switch (sensorName) {
		case "Temperature":
			returnValue = "TE";
			break;
		case "Humidity":
			returnValue = "HU";
			break;
		case "Motion":
			returnValue = "MO";
			break;
		case "Door":
			returnValue = "DR";
			break;
		case "Reely Active":
			returnValue = "RA";
			break;
		default:
			returnValue = "";
			console.error("Warning: Sensor type for Name \"" + sensorName + "\" unknown.");
	}
	return returnValue;
}

function setValue(containerElement, dataChoice) {
	containerElement.innerHTML = dataChoice;
	containerElement.value = dataChoice;
}

function sleep(timeUnits) {
	var startTime = new Date().getTime() + timeUnits;
	while (new Date().getTime() < startTime);
}

function getDateInUTC(timestamp) {
	var date	= new Date(timestamp);
	var year    = date.getUTCFullYear();
	var month   = date.getUTCMonth() + 1; // getMonth() is zero-indexed, so we'll increment to get the correct month number
	var day     = date.getUTCDate();
	var hours   = date.getUTCHours();
	var minutes = date.getUTCMinutes();
	var seconds = date.getUTCSeconds();

	return new Date(year, month, day, hours, minutes, seconds);
}

function getDateString(timestamp) {
	var date = new Date(timestamp);
	var currDate = date.getDate();
	var currMonth = date.getMonth() + 1;
	var currYear = date.getFullYear();
	var currHour = date.getHours();
	var currMinute = date.getMinutes();
	var currSecond = date.getSeconds();
	
	return currYear + "-" + currMonth + "-" + currDate + " " + currHour + ":" + currMinute + ":" + currSecond;
}

function getReadableDateString(timestamp) {
	var date = new Date(timestamp);
	var currDate = date.getDate();
	var currMonth = date.getMonth() + 1;
	var currYear = date.getFullYear();
	var currAmPm = date.getHours() >= 12 ? "pm" : "am";
	var currHour = date.getHours() % 12;
	currHour = currHour ? currHour : 12;
	var currMinute = date.getMinutes();
	var currSecond = date.getSeconds();
	var monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	  ];
	return monthNames[currMonth - 1] + " " + currDate +  " " + currYear + " - " + currHour + ":" + currMinute + ":" + currSecond + " " + currAmPm;
}

function getDataValueBySensorType(sensorType, dataType) {
	switch(sensorType) {
		case "MO":
			dataType = dataType === true ? "Motion Detected" : "No Motion";
			break;
		case "DR":
			dataType = dataType === true ? "Open" : "Closed";
			break;
	}
	
	return dataType;
}

function getDataTypeBySensorType(sensorType) {
	var dataType = "";
	
	switch(sensorType) {
		case "TE":
			dataType = "Celcius";
			break;
		case "HU":
			dataType = "%";
			break;
		case "RA":
			dataType = "RSSI";
			break;
	}
	
	return dataType;
}