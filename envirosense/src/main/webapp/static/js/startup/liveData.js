/**
 * This startup sequence will contain Javascript functions that will initialize 
 * the DOM elements for the HTML like making button listeners and handling form
 * submits.
 */

/**
 * This is used to bind an "On Load" event onto the window object.
 */
if (window.addEventListener) { //W3 Standards
	window.addEventListener('load', startupController, false);
} else if (window.attachEvent) { //Microsoft Standards
	window.attachEvent('onload', startupController);
}

function startupController() {
	runNavbar();
	formSubmitListeners();
}

function formSubmitListeners() {
	var roomsToggle = document.getElementById("roomsToggle");
	var sensorsToggle = document.getElementById("sensorsToggle");
	
	/*
	 * By makign an AJAX call to all rooms, we are able to get the ID for each
	 * room that is available to the system. Once we have the ID of all the
	 * rooms, we can make an API call to those rooms that shows sensor data
	 * for each room.
	 */
	roomsToggle.addEventListener("click", function () {
		
		var mainForm = createForm("liveDataAllRoomsAndSensors", "room", "all");
		runAjax(mainForm);
		
		var counterInterval = setTimeout(function () {
			var slickSlides = document.getElementById("slickSlides").children;

			if (slickSlides.length > 1) {
				clearTimeout(counterInterval);
				for (var index = 2; index < slickSlides.length; index += 2) {	
					var sensorType = slickSlides[index].id;
					var mainForm = createForm("liveDataRooms", "Room", sensorType);
					runAjax(mainForm);
					
					setTimeout(function liveDataInterval(mainForm) {
						runAjax(mainForm);
						setTimeout(liveDataInterval, 1000, mainForm);
					}, 1000, mainForm);
				}
			}
		}, 300);
	});
	
	sensorsToggle.addEventListener("click", function () {
		/*
		 * We put it in a constant loop interval because it might run even
		 * though the "Slick Slides" aren't created yet, thus creating problems.
		 * Once it detects the...
		 */
		var mainForm = createForm("liveDataAllRoomsAndSensors", "sensor", "all");
		runAjax(mainForm);
		
		var counterInterval = setTimeout(function () {
			var slickSlides = document.getElementById("slickSlides").children;

			if (slickSlides.length > 1) {
				/*
				 * We increment index by 2 because the child nodes of Slick 
				 * Slides are also composed of a title before the target we are
				 * getting.
				 */
				clearTimeout(counterInterval);
				for (var index = 2; index < slickSlides.length; index += 2) {
					var sensorType = slickSlides[index].id;
					var mainForm = createForm("liveDataSensors", "Sensor", sensorType);
					runAjax(mainForm);
					
					setTimeout(function liveDataInterval(mainForm) {
						runAjax(mainForm);
						setTimeout(liveDataInterval, 1000, mainForm);
					}, 1000, mainForm);
				}

			}
		}, 300);
	});
}