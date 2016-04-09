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
	formButtonListeners();
	document.getElementById("roomsToggle").click();
}

/* 
 * We use these global variable to stop the AJAX call intervals so we can make
 * another AJAX call intervals. They are using shared memory that's why only
 * one of them must run at a time.
 */
var sensorInterval = 0;
var roomInterval = 0;

function formButtonListeners() {
	var roomsToggle = document.getElementById("roomsToggle");
	var sensorsToggle = document.getElementById("sensorsToggle");
	
	/*
	 * By makign an AJAX call to all rooms, we are able to get the ID for each
	 * room that is available to the system. Once we have the ID of all the
	 * rooms, we can make an API call to those rooms that shows sensor data
	 * for each room.
	 */
	roomsToggle.addEventListener("click", function () {
		roomsToggle.classList.add("disabled");
		roomsToggle.classList.add("btn-success");
		sensorsToggle.classList.remove("disabled");
		sensorsToggle.classList.remove("btn-success");
		
		clearTimeout(sensorInterval);
		sensorInterval = 0;
		
		var slickSlides = document.getElementById("slickSlides");
		while(slickSlides.children.length > 1) {
			slickSlides.removeChild(slickSlides.children[0]);
		}
		
		var mainForm = createForm("liveDataAllRoomsAndSensors", "room", "all");
		runAjax(mainForm);
		
		var counterInterval = setTimeout(function () {
			var slickSlides = document.getElementById("slickSlides").getElementsByClassName("single-items");

			if (slickSlides.length > 0) {
				clearTimeout(counterInterval);
				for (var index = 0; index < slickSlides.length; index++) {	
					var roomId = slickSlides[index].id;
					var mainForm = createForm("liveDataRooms", "room", roomId);
					runAjax(mainForm);
					
					roomInterval = setTimeout(function liveDataInterval(mainForm) {
						if(roomInterval > 0) {
							runAjax(mainForm);
							setTimeout(liveDataInterval, 1000, mainForm);
						}
					}, 1000, mainForm);
				}
			}
		}, 300);
	});
	
	sensorsToggle.addEventListener("click", function () {
		sensorsToggle.classList.add("disabled");
		sensorsToggle.classList.add("btn-success");
		roomsToggle.classList.remove("disabled")
		roomsToggle.classList.remove("btn-success");
		
		clearTimeout(roomInterval);
		roomInterval = 0;
		
		var slickSlides = document.getElementById("slickSlides");
		while(slickSlides.children.length > 1) {
			slickSlides.removeChild(slickSlides.children[0]);
		}
		
		/*
		 * We put it in a constant loop interval because it might run even
		 * though the "Slick Slides" aren't created yet, thus creating problems.
		 * Once it detects that there are now containers created, we fill in
		 * those containers based on another AJAX call.
		 */
		var mainForm = createForm("liveDataAllRoomsAndSensors", "sensor", "all");
		runAjax(mainForm);
		
		var counterInterval = setTimeout(function () {
			var slickSlides = document.getElementById("slickSlides").getElementsByClassName("single-items");
			
			if (slickSlides.length > 0) {
				/*
				 * We increment index by 2 because the child nodes of Slick 
				 * Slides are also composed of a title before the target we are
				 * getting.
				 */
				clearTimeout(counterInterval);
				for (var index = 0; index < slickSlides.length; index++) {
					var sensorType = slickSlides[index].id;
					var mainForm = createForm("liveDataSensors", "Sensor", sensorType);
					runAjax(mainForm);
					
					sensorInterval = setTimeout(function liveDataInterval(mainForm) {
						if (sensorInterval > 0) {
							runAjax(mainForm);
							setTimeout(liveDataInterval, 1000, mainForm);
						}
					}, 1000, mainForm);
				}
			}
		}, 300);
	});
}