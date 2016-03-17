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
		var dataContainer = document.getElementById(sensorType).getElementsByClassName("dataContainer");
		
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
	} catch (errorEvent) {
		/*
		 * Do something.
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
			jsonAttributes.push(jsonObject[index]["sensorType"]);
			jsonData.push([]);
		}
		
		/*
		 * Since Google Charts isn't very stable when handling boolean values,
		 * we have to change the JSON object's boolean values to either 1 or 0
		 * if ever there is a boolean value present in the data.
		 */
		if (jsonObject[index]["data"] === true) {
			jsonObject[index]["data"] = 1;
		}
		
		jsonProperty.timestamp = jsonObject[index]["timestamp"];
		jsonProperty.data = jsonObject[index]["data"];
		
		jsonData[uniqueId.indexOf(sortAttribute)].push(jsonProperty);
	}
	
	for (var index = 0; index < uniqueId.length; index++) {
		formattedJson = new Object();
		formattedJson.sensorId = uniqueId[index];
		formattedJson.sensorType = jsonAttributes[index];
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
		values: {
			timestamp: jsonObject["values"][0]["timestamp"],
			data: jsonObject["values"][0]["data"]	
		}
	};
	
	var sensorId = domElement.getElementsByClassName("sensorId")[0];
	var sensorType = domElement.getElementsByClassName("sensorType")[0];
	var sensorTime = domElement.getElementsByClassName("sensorTime")[0];
	var sensorValue = domElement.getElementsByClassName("sensorValue")[0];
	
	sensorId.appendChild(document.createTextNode("ID: " + jsonElement.id));
	sensorType.appendChild(document.createTextNode("Type: " + jsonElement.sensorType));
	sensorTime.appendChild(document.createTextNode("Timestamp: " + jsonElement.values.timestamp));
	sensorValue.appendChild(document.createTextNode("Data: " + jsonElement.values.data));
}