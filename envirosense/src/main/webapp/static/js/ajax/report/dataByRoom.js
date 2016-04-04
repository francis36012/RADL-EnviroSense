/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function getDataByRoom(formElement) {
	var roomType = formElement.dataType.value.split("ID: ")[1];
	var startTime = formElement.fromDate.value.replace(/T|Z/g, " ");
	var endTime = formElement.toDate.value.replace(/T|Z/g, " ");
	var buttonLoader = formElement.submitButton;
	
	startTime = getDateString(new Date(startTime));
	endTime = getDateString(new Date(endTime));
	
	var laddaButton = Ladda.create(buttonLoader);
	laddaButton.start();
	
	var xmlHttp;
	if (window.XMLHttpRequest) { 
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlHttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlHttp.onreadystatechange = function() {
		readyStateChangeByRoom(xmlHttp, laddaButton);
	};
	xmlHttp.open("GET", "/envirosense/api/report/room/" + roomType + "/"+ startTime + "/" + endTime, true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChangeByRoom(xmlHttp, laddaButton) {
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
					
					laddaButton.setProgress(.6);
					var currentPercent = .6;
					var incrementPercent = (1 - currentPercent)/jsonObject.length;
					
					clearPanels(null);
					
					for (var index = 0; index < jsonObject.length; index++) {
						/*
						 * You might have noticed it's loading by Sensor Type.
						 * That's because the JSON object that comes in from
						 * the AJAX call is in the same format as calling
						 * it by Sensor Type. We can reduce code repeatition
						 * by using the Loading of data by Sensor Type.
						 */
						loadDataBySensorType(jsonObject[index], dataContainer[index]);
						laddaButton.setProgress(currentPercent += incrementPercent);
					}
					
					setTimeout(function() {
						laddaButton.stop();
					}, 500);
					
				} else {
					/*
					 * There's a response that had been receieved but it has
					 * no length. We can safely assume that it has no value, 
					 * however, we cannot assume that the server returned a
					 * "404 Not Found" or "204 No Data Found" status.
					 */
				}
			}
		} else if (xmlHttp.status === 404) {
			/*
			 * Status 404 was returned. We create a panel with the error
			 * message "Something went wrong. Please check connection to
			 * server."
			 */
			
			laddaButton.setProgress(1);
			setTimeout(function() {
				laddaButton.stop();
			}, 500);
			
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
			
			laddaButton.setProgress(1);
			setTimeout(function() {
				laddaButton.stop();
			}, 500);
		}
	} catch (errorEvent) {
		setTimeout(function() {
			laddaButton.stop();
		}, 500);
		
		throw errorEvent;
	}
}