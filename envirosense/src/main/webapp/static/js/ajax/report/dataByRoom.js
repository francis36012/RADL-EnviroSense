/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function getDataByRoom(formElement, buttonLoader) {
	var roomType = formElement.dataType.value.split("ID: ")[1];
	var startTime = formElement.fromDate.value;
	var endTime = formElement.toDate.value;
	var buttonLoader = formElement.submitButton;
	
	var dateRegex = /T|Z/;
	startTime = new Date(startTime).toISOString().split(dateRegex);
	endTime = new Date(endTime).toISOString().split(dateRegex);
	var finalStartTime = startTime[0] + " " + startTime[1].slice(0, -4);
	var finalEndTime = endTime[0] + " " + endTime[1].slice(0, -4);
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		readyStateChangeByRoom(xmlHttp, buttonLoader);
	};
	xmlHttp.open("GET", "/envirosense/api/report/room/" + roomType + "/"+ finalStartTime + "/" + finalEndTime, true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChangeByRoom(xmlHttp, buttonLoader) {
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

				if (jsonObject.length > 0) {
					jsonObject = reformatJsonBySensorType(jsonObject, "sensorId");
					
					if (jsonObject.length > dataContainer.length) {
						while (jsonObject.length > dataContainer.length) {
							$('.single-items').slick("slickAdd", createContainerByRoomId());
						}
					} else if (jsonObject.length < dataContainer.length) {
						while (dataContainer.length > jsonObject.length) {
							if (!$('.single-items').slick("slickRemove", false)) {
								dataContainer[0].parentNode.parentNode.remove();
							}
						}
					}
					
					clearPanels(null);
					laddaButton.setProgress(.8);
					for (var index = 0; index < jsonObject.length; index++) {
						/*
						 * You might have noticed it's loading by Sensor Type.
						 * That's because the JSON object that comes in from
						 * the AJAX call is in the same format as calling
						 * it by Sensor Type. We can reduce code repeatition
						 * by using the Loading of data by Sensor Type.
						 */
						loadDataBySensorType(jsonObject[index], dataContainer[index]);
					}
					
				} else {
					/*
					 * There's a response that had been receieved but it has
					 * no length. We can safely assume that it has no value, 
					 * however, we cannot assume that the server returned a
					 * "404 Not Found" or "204 No Data Found" status.
					 */
				}
				laddaButton.setProgress(1);
			}
		} else if (xmlHttp.status === 404) {
			/*
			 * Status 404 was returned. We create a panel with the error
			 * message "Something went wrong. Please check connection to
			 * server."
			 */
		} else if (xmlHttp.status === 204) {
			/*
			 * No data was found. We create a panel with the error message
			 * "No data was found with that criteria."
			 */
			while (dataContainer.length > 0) {
				if (!$('.single-items').slick("slickRemove", false)) {
					dataContainer[0].parentNode.parentNode.remove();
				}
			}
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