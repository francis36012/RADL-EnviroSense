/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function getDataByRoomId(formElement) {
	var roomId = formElement.type.value;
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		readyStateChangeBySensorType(xmlHttp, formElement);
	};
	xmlHttp.open("GET", "/envirosense/api/data/live/room/" + roomId, true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChangeByRoomId(xmlHttp, formElement) {
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
		
		var sensorType = formElement.type.value;
		var dataContainer = document.getElementById(sensorType).getElementsByClassName("dataContainer");
		
		if (xmlHttp.status === 200) {
			if (xmlHttp.readyState === 4) {
				var jsonObject = JSON.parse(xmlHttp.responseText);
				if (jsonObject.length > 0) {
					jsonObject = reformatJsonBySensorType(jsonObject, "sensorId");

					if (jsonObject.length > dataContainer.length) {
						while (jsonObject.length > dataContainer.length) {
							$("#" + sensorType).slick("slickAdd", createContainerByRoomId());
						}
					} else if (jsonObject.length < dataContainer.length) {
						while (dataContainer.length > jsonObject.length) {
							if (!$("#" + sensorType).slick("slickRemove", false)) {
								dataContainer[0].parentNode.parentNode.remove();
							}
						}
					}
					
					clearPanels(document.getElementById(sensorType).getElementsByClassName("dataContainer"));
					for (var index = 0; index < jsonObject.length; index++) {
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
			}
		} else if (xmlHttp.status === 204) {
			/*
			 * No data was found. We create a panel with the error message
			 * "No data was found with that criteria."
			 */
			while (dataContainer.length > 1) {
				dataContainer[0].parentNode.parentNode.remove();
			}
			
			var messagePanel = createContainerBySensorType();
			var messageText = createNode("div", ["alert", "alert-warning"], null);
			messageText.innerHTML = "No data is currently stored.";
			var messageContainer = messagePanel.getElementsByClassName("sensorValue")[0];
			messageContainer.appendChild(messageText);
			
			if (dataContainer.length === 1) {
				dataContainer[0] = messagePanel;
			} else {
				$("#" + sensorType).slick("slickAdd", messagePanel);
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