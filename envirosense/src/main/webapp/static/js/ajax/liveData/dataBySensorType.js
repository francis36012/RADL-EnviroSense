/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function getDataBySensorType(formElement) {
	var sensorType = formElement.type.value;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		readyStateChangeBySensorType(xmlHttp, formElement);
	};
	xmlHttp.open("GET", "/envirosense/api/data/live/sensortype/" + sensorType, true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChangeBySensorType(xmlHttp, formElement) {
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
		var dataContainer = document.getElementById(sensorType);
		if (dataContainer) {
			dataContainer = dataContainer.getElementsByClassName("dataContainer");
		} else {
			return;
		}
		
		if (xmlHttp.status === 200) {
			if (xmlHttp.readyState === 4) {
					var jsonObject = JSON.parse(xmlHttp.responseText);
					if (jsonObject.length > 0) {
						jsonObject = reformatJsonBySensorType(jsonObject, "sensorId");

						if (jsonObject.length > dataContainer.length) {
							while (jsonObject.length > dataContainer.length) {
								$("#" + sensorType).slick("slickAdd", createContainerBySensorType());
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
					hideLoader();
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
			
			hideLoader();
			
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

function reformatJsonBySensorType(jsonObject, sortKey) {
	/*
	 * Suggested JSON format:
	 * 1.]	sensorId
	 * 2.]	sensorType
	 * 3.]	values
	 *		i.	timestamp
	 *		ii.	data
	 */
	var formattedJson = {
		sensorId: null,
		sensorType: null,
		roomName: null,
		roomDescription: null,
		values: null
	};
	var uniqueId = [];
	var jsonAttributes = [];
	var jsonData = [];
	var returnValue = [];
	
	for (var index = 0; index < jsonObject.length; index++) {
		var jsonProperty = {
			timestamp: null, 
			data: null
		};
		var sortAttribute = jsonObject[index][sortKey];
		
		if (uniqueId.indexOf(sortAttribute) < 0) {
			uniqueId.push(sortAttribute);
			jsonAttributes.push({
				sensorType: jsonObject[index]["sensorType"],
				roomName: jsonObject[index]["roomName"],
				roomDescription: jsonObject[index]["roomDescription"]
			});
			jsonData.push([]);
		}
		
		/*
		 * Since Google Charts isn't very stable when handling boolean values,
		 * we have to change the JSON object's boolean values to either 1 or 0 
		 * if ever there is a boolean value present in the data.
		 */
		if (jsonObject[index]["data"] === true || jsonObject[index]["data"] === false) {
			jsonObject[index]["data"] = getDataValueBySensorType(jsonObject[index]["sensorType"], jsonObject[index]["data"]);
		}
		
		jsonProperty.timestamp = jsonObject[index]["timestamp"];
		jsonProperty.data = jsonObject[index]["data"];
		
		jsonData[uniqueId.indexOf(sortAttribute)].push(jsonProperty);
	}
	
	for (var index = 0; index < uniqueId.length; index++) {
		formattedJson = new Object();
		formattedJson.sensorId = uniqueId[index];
		formattedJson.sensorType = jsonAttributes[index]["sensorType"];
		formattedJson.roomName = jsonAttributes[index]["roomName"];
		formattedJson.roomDescription = jsonAttributes[index]["roomDescription"];
		formattedJson.values = jsonData[index];
		
		returnValue.push(formattedJson);
	}
	
	return JSON.parse(JSON.stringify(returnValue));
}



/* ---------------------------------------- */
/*				DATA LOADER					*/
/* ---------------------------------------- */
function loadDataBySensorType(jsonObject, domElement) {
	var jsonElement = {
		id: jsonObject["sensorId"],
		sensorType: jsonObject["sensorType"],
		roomName: jsonObject["roomName"],
		roomDescription: jsonObject["roomDescription"],
		values: {
			timestamp: jsonObject["values"][0]["timestamp"],
			data: jsonObject["values"][0]["data"]
		}
	};
	
	// IF not Reely actinve
	var sensorId = domElement.getElementsByClassName("sensorId")[0];
	var sensorType = domElement.getElementsByClassName("sensorType")[0];
	var sensorTime = domElement.getElementsByClassName("sensorTime")[0];
	var sensorValue = domElement.getElementsByClassName("sensorValue")[0];
	var roomName = domElement.getElementsByClassName("roomName")[0];
	var roomDescription = domElement.getElementsByClassName("roomDescription")[0];
	
	var h1 = createNode("h1", ["text-center"], null);
	var h2 = createNode("h2", ["text-center"], null);
	var h3 = createNode("h3", ["text-center"], null);
	var h4 = createNode("h4", ["text-center"], null);
	var bold = createNode("b", null, null);
	var small = createNode("small", null, null);
	var br = createNode("br", null, null);
	var toAppend = null;
	var subText = null;
	
	if (jsonElement.sensorType === "RA") {
		var afterDomain = jsonElement.values.data.userEmail.split("@")[1];
		var beforeDomain = bold.cloneNode();
		beforeDomain.appendChild(document.createTextNode(jsonElement.values.data.userEmail.split("@")[0]));
		
		toAppend = h3.cloneNode();
		toAppend.appendChild(beforeDomain);
		
		subText = small.cloneNode();
		subText.appendChild(createNode("br", null, null));
		subText.appendChild(document.createTextNode("@" + afterDomain));
		toAppend.appendChild(subText);
		toAppend.appendChild(br.cloneNode());
		
		subText = h4.cloneNode();
		subText.appendChild(document.createTextNode(jsonElement.values.data.rssi));
		var subText2 = small.cloneNode();
		subText2.appendChild(document.createTextNode(getDataTypeBySensorType(jsonElement.sensorType)));
		subText.appendChild(subText2);
		toAppend.appendChild(subText);
		
		sensorValue.appendChild(toAppend);
	} else {
		toAppend = h1.cloneNode();
		toAppend.appendChild(document.createTextNode(jsonElement.values.data));
		
		sensorValue.appendChild(toAppend);
		
		var subText = small.cloneNode();
		subText.appendChild(document.createTextNode(" " + getDataTypeBySensorType(jsonElement.sensorType)));
		toAppend.appendChild(subText);
	}
	
	toAppend = h3.cloneNode();
	toAppend.appendChild(document.createTextNode(getSensorNameByType(jsonElement.sensorType)));
	sensorType.appendChild(createNode("hr", null, null));
	sensorType.appendChild(toAppend);
	
	toAppend = h3.cloneNode();
	toAppend.appendChild(document.createTextNode(jsonElement.roomName));
	
	subText = small.cloneNode();
	subText.appendChild(createNode("br", null, null));
	subText.appendChild(document.createTextNode(jsonElement.roomDescription));
	toAppend.appendChild(subText);
	
	roomName.appendChild(toAppend);
	roomName.appendChild(createNode("hr", null, null));
	
	toAppend = small.cloneNode();
	toAppend.appendChild(document.createTextNode(getReadableDateString(jsonElement.values.timestamp.replace(/T|Z|[.]\d{3}/g, " "))));
	sensorTime.appendChild(toAppend);
}