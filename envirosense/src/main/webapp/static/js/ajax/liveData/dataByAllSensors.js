
/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function getDataByAllSensors() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		readyStateChangeByAllSensors(xmlHttp);
	};
	xmlHttp.open("GET", "/envirosense/api/sensor/all", true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChangeByAllSensors(xmlHttp) {
	
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
				var jsonObject = JSON.parse(xmlHttp.responseText);

				if (jsonObject !== null) {
					var sensorCategory = [];
					for (var index = 0; index < jsonObject.length; index++) {
						if (sensorCategory.indexOf(jsonObject[index]["sensorType"]) < 0) {
							sensorCategory.push(jsonObject[index]["sensorType"]);
							var toAppend = createSlidesByAllSensors();
							toAppend.setAttribute("id", jsonObject[index]["sensorType"]);

							var slickSlides = document.getElementById("slickSlides");
							slickSlides.appendChild(toAppend);
						}
					}
				} else {
					//No Data Found
				}
				
				$('.single-items').slick({
					dots: true,
					infinite: false,
					arrows: false,
					speed: 250,
					initialSlide: 0,
					mobileFirst: true,
					responsive: [
					{
						breakpoint: 769,
						settings: "unslick"
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}]
				});
			}
		} else if (xmlHttp.status === 404) {
			//Can't connect
		}
	} catch (errorEvent) {
		throw errorEvent;
	}
}


/* ---------------------------------------- */
/*				DATA LOADER					*/
/* ---------------------------------------- */

function loadDataByAllSensors(jsonObject, domElement) {
	var jsonElement = {
		id: jsonObject["id"],
		room: {
			id: jsonObject["room"]["id"],
			name: jsonObject["room"]["name"],
			description: jsonObject["room"]["description"]
		},
		name: jsonObject["name"],
		sensorType: jsonObject["sensorType"]
	};

	var sensorId = domElement.getElementsByClassName("sensorId")[0];
	var sensorName = domElement.getElementsByClassName("sensorName")[0];
	var sensorType = domElement.getElementsByClassName("sensorType")[0];
	
	var roomId = domElement.getElementsByClassName("roomId")[0];
	var roomName = domElement.getElementsByClassName("roomName")[0];
	var roomDescription = domElement.getElementsByClassName("roomDescription")[0];
	
	sensorId.innerHTML = "ID: " + jsonElement.id;
	sensorName.innerHTML = "Name: " + jsonElement.name;
	sensorType.innerHTML = "Type: " + jsonElement.sensorType;
	
	roomId.innerHTML = "ID: " + jsonElement.room.id + "<br />";
	roomName.innerHTML = "Name: " + jsonElement.room.name + "<br />";
	roomDescription.innerHTML = jsonElement.room.description;
}