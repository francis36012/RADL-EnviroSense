
/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function getDataByAllRoomsAndSensors(formElement) {
	var dataCategory = formElement.category.value;
	var dataValue = formElement.type.value;
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		readyStateChangeByRoomsAndSensors(xmlHttp, formElement);
	};
	xmlHttp.open("GET", "/envirosense/api/" + dataCategory + "/" + dataValue, true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChangeByRoomsAndSensors(xmlHttp, formElement) {
	
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

				if (jsonObject.length !== 0) {
					if (formElement.category.value === "sensor") {
						var sensorCategory = [];
						for (var index = 0; index < jsonObject.length; index++) {
							if (sensorCategory.indexOf(jsonObject[index]["sensorType"]) < 0) {
								sensorCategory.push(jsonObject[index]["sensorType"]);
								var toAppend = createSlickSlideContainer();
								toAppend.setAttribute("id", jsonObject[index]["sensorType"]);

								var br = createNode("br", null, null);
								var h3 = createNode("h3", ["text-center"], null);
								h3.appendChild(document.createTextNode(getSensorNameByType(jsonObject[index]["sensorType"])));
								
								var slickSlides = document.getElementById("slickSlides");
								slickSlides.appendChild(h3);
								slickSlides.appendChild(toAppend);
								slickSlides.appendChild(br);
							}
						}
					} else if (formElement.category.value === "room") {
						var roomId = [];
						for (var index = 0; index < jsonObject.length; index++) {
							if (roomId.indexOf(jsonObject[index]["id"]) < 0) {
								roomId.push(jsonObject[index]["id"]);
								var toAppend = createSlickSlideContainer();
								toAppend.setAttribute("id", jsonObject[index]["id"]);
								
								var br = createNode("br", null, null);
								var h3 = createNode("h3", ["text-center"], null);
								var small = createNode("small", null, null);
								small.appendChild(document.createTextNode(jsonObject[index]["name"]));
								h3.appendChild(document.createTextNode(jsonObject[index]["description"] + " "));
								h3.appendChild(small);
								
								var slickSlides = document.getElementById("slickSlides");
								slickSlides.appendChild(h3);
								slickSlides.appendChild(toAppend);
								slickSlides.appendChild(br);
							}
						}
					}
				}
				runSlick();
			}
		} else if (xmlHttp.status !== 0) {
			/*
			 * Having to reach this line of code means that there is something 
			 * wrong that happenned that is unexpected.
			 */
		}
	} catch (errorEvent) {
		/*
		 * This error is most likely because of the race condition on which
		 * AJAX call gets the resource. Whenever a room and sensor makes an
		 * AJAX call at the same time, it's a race on who would get the DOM
		 * elements and fill it in with their data.
		 */
		throw errorEvent;
	}
}