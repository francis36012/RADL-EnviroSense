/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function getDataBySensorType(formElement) {
	/*
	 * Internet Explorer 11 doesn't have a good date parser, so whenever we 
	 * create a date object, it's returning NaN.
	 */
	var sensorType = getSensorTypeByName(formElement.dataType.value);
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
		readyStateChangeBySensorType(xmlHttp, laddaButton);
	};
	xmlHttp.open("GET", "/envirosense/api/report/type/" + sensorType + "/"+ startTime + "/" + endTime, true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChangeBySensorType(xmlHttp, laddaButton) {
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
			if (xmlHttp.readyState === 4) {
				laddaButton.setProgress(.3);
				var jsonObject = JSON.parse(xmlHttp.responseText);
				laddaButton.setProgress(.5);

				if (jsonObject.length > 0) {
					jsonObject = reformatJsonBySensorType(jsonObject, "sensorId");
					
					if (jsonObject.length > dataContainer.length) {
						while (jsonObject.length > dataContainer.length) {
							$('.single-items').slick("slickAdd", createContainerBySensorType());
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
					
					setTimeout(function() {
						laddaButton.stop();
					}, 500);
				}
			}
		} else if (xmlHttp.status === 404) {
			/*
			 * Status 404 was returned. We create a panel with the error
			 * message "Something went wrong. Please check connection to
			 * server."
			 */
			
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
		 * we have to change the JSON object's boolean values to a string value
		 * if ever there is a boolean value present in the data.
		 */
		if (jsonObject[index]["data"] === true || jsonObject[index]["data"] === false) {
			jsonObject[index]["data"] = jsonObject[index]["data"] === true ? 1 : 0;
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
	
	var sensorId = domElement.getElementsByClassName("sensorId")[0];
	var sensorType = domElement.getElementsByClassName("sensorType")[0];
	var sensorTime = domElement.getElementsByClassName("sensorTime")[0];
	var sensorValue = domElement.getElementsByClassName("sensorValue")[0];
	var roomName = domElement.getElementsByClassName("roomName")[0];
	var roomDescription = domElement.getElementsByClassName("roomDescription")[0];
	
	var h1 = createNode("h1", ["text-center"], null);
	var h4 = createNode("h4", ["text-center"], null);
	var small = createNode("small", ["text-center"], null);
	var well = createNode("div", ["well", "well-sm"], null);
	var toAppend = null;
	
	toAppend = h1.cloneNode();
	toAppend.appendChild(document.createTextNode(getSensorNameByType(jsonElement.sensorType)));
	sensorType.appendChild(toAppend);
	
	toAppend = h4.cloneNode();
	toAppend.appendChild(document.createTextNode("Room: " + jsonElement.roomName));
	roomName.appendChild(createNode("hr", null, null));
	roomName.appendChild(toAppend);
	
	toAppend = well.cloneNode();
	toAppend.appendChild(document.createTextNode(jsonElement.roomDescription));
	roomDescription.appendChild(toAppend);
	
	if (window.google) {
		generateChartBySensorType(jsonObject, sensorTime, jsonElement.sensorType);
	} else {
		var divider = createNode("hr", null, null);
		var alertMessage = createNode("p", null, null);
		alertMessage.innerHTML = "Cannot connect to Google Charts. ";
		alertMessage.innerHTML += "Please check your internet connectivity.";
		var alertDiv = createNode("div", ["alert", "alert-warning"], null);
		alertDiv.appendChild(alertMessage);
		
		var collapseToggle = createNode("a", null, [["href", "#dataset" + jsonElement.id], ["data-toggle", "collapse"]]);
		collapseToggle.innerHTML = "Show Data";
		var collapseContainer = createNode("div", ["collapse"], [["id", "dataset" + jsonElement.id]]);
		
		for (var index = 0; index < jsonObject.values.length; index++) {
			collapseContainer.appendChild(createNode("br", null, null));
			collapseContainer.appendChild(document.createTextNode(new Date(jsonObject.values[index]["timestamp"]) + " - "));
			collapseContainer.appendChild(document.createTextNode(jsonObject.values[index]["data"]));
		}
		
		sensorTime.appendChild(divider);
		sensorTime.appendChild(alertDiv);
		
		sensorTime.appendChild(collapseToggle);
		sensorTime.appendChild(collapseContainer);
	}
}

function generateChartBySensorType(jsonObject, domElement, sensorType) {
	var rawData = [];
	for (var index = 0; index < jsonObject.values.length; index++) {
		rawData.push([new Date(jsonObject.values[index]["timestamp"].replace(/T|Z/g, " ")), jsonObject.values[index]["data"]]);
	}
	if (sensorType === "MO" || sensorType === "DR") {
		google.charts.setOnLoadCallback(function () {
			var data = new google.visualization.DataTable();
			data.addColumn('datetime', 'X');
			data.addColumn('number', 'Event');
			data.addRows(rawData);

			var options = {
				hAxis: {
					title: 'Time',
					format: 'MMM dd - HH:mm'
				},
				vAxis: {
					title: 'Event',
					ticks: [0, 1],
					viewWindow: {
						min: 0,
						max: 1
					}
				},
				legend: 'none',
				colors: [
					'#5CB85C'
				]
			};

			var chart = new google.visualization.SteppedAreaChart(domElement);
			chart.draw(data, options);
		});
	} else if(sensorType === "TE") {
		google.charts.setOnLoadCallback(function () {
			var data = new google.visualization.DataTable();
			data.addColumn('datetime', 'X');
			data.addColumn('number', 'Celcius');
			data.addRows(rawData);

			var options = {
				hAxis: {
					title: 'Time',
					format: 'MMM dd - HH:mm'
				},
				vAxis: {
					title: 'Temperature',
					viewWindow: {
						min: 40,
						max: -20
					}
				},
				legend: 'none',
				colors: [
					'#5CB85C'
				]
			};

			var chart = new google.visualization.LineChart(domElement);
			chart.draw(data, options);
		});
	} else if(sensorType === "HU") {
		google.charts.setOnLoadCallback(function () {
			var data = new google.visualization.DataTable();
			data.addColumn('datetime', 'X');
			data.addColumn('number', '%');
			data.addRows(rawData);

			var options = {
				hAxis: {
					title: 'Time',
					format: 'MMM dd - HH:mm'
				},
				vAxis: {
					title: 'Humidity',
					viewWindow: {
						min: 100,
						max: 0
					}
				},
				legend: 'none',
				colors: [
					'#5CB85C'
				]
			};

			var chart = new google.visualization.LineChart(domElement);
			chart.draw(data, options);
		});
	} else if (sensorType === "RA") {
		var alertMessage = createNode("p", null, null);
		alertMessage.innerHTML = "Chart for Reely Active sensors are not supported yet.";
		var alertDiv = createNode("div", ["alert", "alert-warning"], null);
		alertDiv.appendChild(alertMessage);
		
		var collapseToggle = createNode("a", null, [["href", "#dataset" + jsonObject["sensorId"]], ["data-toggle", "collapse"]]);
		collapseToggle.innerHTML = "Show Data";
		var collapseContainer = createNode("div", ["collapse"], [["id", "dataset" + jsonObject["sensorId"]]]);
		
		for (var index = 0; index < jsonObject.values.length; index++) {
			collapseContainer.appendChild(createNode("br", null, null));
			collapseContainer.appendChild(document.createTextNode(new Date(jsonObject.values[index]["timestamp"]) + " - "));
			collapseContainer.appendChild(document.createTextNode(jsonObject.values[index]["data"]["rssi"]));
		}
		
		domElement.appendChild(alertDiv);
		
		domElement.appendChild(collapseToggle);
		domElement.appendChild(collapseContainer);
	} else {
		var alertMessage = createNode("p", null, null);
		alertMessage.innerHTML = "Google Charts don't understand the data specified.";
		var alertDiv = createNode("div", ["alert", "alert-warning"], null);
		alertDiv.appendChild(alertMessage);
		
		var collapseToggle = createNode("a", null, [["href", "#dataset" + jsonObject["sensorId"]], ["data-toggle", "collapse"]]);
		collapseToggle.innerHTML = "Show Data";
		var collapseContainer = createNode("div", ["collapse"], [["id", "dataset" + jsonObject["sensorId"]]]);
		
		for (var index = 0; index < jsonObject.values.length; index++) {
			collapseContainer.appendChild(createNode("br", null, null));
			collapseContainer.appendChild(document.createTextNode(new Date(jsonObject.values[index]["timestamp"]) + " - "));
			collapseContainer.appendChild(document.createTextNode(jsonObject.values[index]["data"]));
		}
		
		domElement.appendChild(alertDiv);
		
		domElement.appendChild(collapseToggle);
		domElement.appendChild(collapseContainer);
	}
	return domElement;
}