
/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function getDataByAllSensors(buttonLoader) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		readyStateChangeByAllSensors(xmlHttp, buttonLoader);
	};
	xmlHttp.open("GET", "/envirosense/api/sensor/all", true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChangeByAllSensors(xmlHttp, buttonLoader) {
	var laddaButton = Ladda.create(buttonLoader);
	laddaButton.start();
	laddaButton.setProgress(0);
	
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
	var dataContainer = document.getElementsByClassName("dataContainer");
	
	if (xmlHttp.status === 200) {
		laddaButton.setProgress(.3);
		
		if (xmlHttp.readyState === 4) {
			var jsonObject = JSON.parse(xmlHttp.responseText);
			laddaButton.setProgress(.5);
			
			if (jsonObject !== null) {
				if (jsonObject.length > dataContainer.length) {
					while (jsonObject.length > dataContainer.length) {
						$(".single-items").slick("slickAdd", createContainerByAllSensors());
					}
				} else if (jsonObject.length < dataContainer.length) {
					while (dataContainer.length > jsonObject.length) {
						$(".single-items").slick("slickPrev");
						$(".single-items").slick("slickRemove", false);
					}
				}
			} else {
				//No Data Found
			}
			
			laddaButton.setProgress(.8);
			
			for (var index = 0; index < dataContainer.length; index++) {
				loadDataByAllSensors(jsonObject[index], dataContainer[index]);
			}
			
			laddaButton.setProgress(1);
			
		}
	} else if (xmlHttp.status === 404) {
		//Can't connect
	}
	
	setTimeout(function () {
		laddaButton.stop();
	}, 1000);
	
	} catch (errorEvent) {
		laddaButton.setProgress(0);
		
		setTimeout(function () {
			laddaButton.stop();
		}, 1000);
		
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