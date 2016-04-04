/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */
function getDataBySensorType(formElement) {
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
		
		jsonProperty.timestamp = new Date(jsonObject[index]["timestamp"]);
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
	
	sensorId.innerHTML = "ID: " + jsonElement.id;
	sensorType.innerHTML = "Type: " + getSensorNameByType(jsonElement.sensorType);
	
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
					title: 'Motion',
					ticks: [0, 1],
					viewWindow: {
						min: 0,
						max: 1
					}
				},
				legend: {
					position: 'none'
				}
			};

			var chart = new google.visualization.ScatterChart(domElement);
			chart.draw(data, options);
		});
	} else {
		google.charts.setOnLoadCallback(function () {
			var data = new google.visualization.DataTable();
			data.addColumn('datetime', 'X');
			data.addColumn('number');
			data.addRows(rawData);

			var options = {
				hAxis: {
					title: 'Time',
					format: 'MMM dd - HH:mm'
				},
				vAxis: {
					title: 'Celcius'
				},
				legend: {
					position: 'none'
				}
			};

			var chart = new google.visualization.LineChart(domElement);
			chart.draw(data, options);
		});
	} 
	
	return domElement;
}