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
	var startTime = formElement.fromDate.value.replace(/T|Z|[.]\d{3}/g, " ");
	var endTime = formElement.toDate.value.replace(/T|Z|[.]\d{3}/g, " ");
	var buttonLoader = formElement.submitButton;
	
	/*
	 * Chrome is very flexible when instantiating date objects. One of the main
	 * problems with other browsers, most notably Firefox, is that you can only
	 * construct a date object in a specific format; yyyy-mm-ddThh:mm:ssZ. The
	 * conflict with Firfox and Chrome in terms of this issue is that when 
	 * Firfox construct a date object based on this date format, it treats it
	 * in the browser's local time. In Chrome on the other hand, it treats it
	 * as a GST and the hour values are completely offset, meaning that 
	 * there must be a distinction between Firfox and Chrome, and convert the 
	 * time accordingly.
	 * 
	 * For right now, we are in compliance with Chrome.
	 */
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
							$('.single-items')[0].appendChild(createContainerBySensorType());
						}
					} else if (jsonObject.length < dataContainer.length) {
						while (dataContainer.length > jsonObject.length) {
							dataContainer[0].parentNode.parentNode.remove();
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
		} else if (xmlHttp.status === 204) {
			/*
			 * No data was found. We create a panel with the error message
			 * "No data was found with that criteria."
			 */
			while ($('.single-items')[0].children.length > 0) {
				$('.single-items')[0].children[0].remove();
			}

			var messagePanel = createContainerBySensorType();
			var messageText = createNode("div", ["alert", "alert-warning"], null);
			messageText.innerHTML = "No data is currently stored at specified options.";
			var messageContainer = messagePanel.getElementsByClassName("sensorValue")[0];
			messageContainer.appendChild(messageText);
			
			$('.single-items')[0].appendChild(messagePanel);

			setTimeout(function() {
				laddaButton.stop();
			}, 500);
			
		} else if (xmlHttp.status !== 0) {
			/*
			 * Having to reach this line of code means that there is something 
			 * wrong that happenned that is unexpected.
			 */
			
			laddaButton.setProgress(0);
			setTimeout(function() {
				laddaButton.stop();
			}, 300);
			
			var errorTitle = document.getElementById("popupMessage").getElementsByClassName("modal-title")[0];
			errorTitle.innerHTML = "";
			errorTitle.appendChild(document.createTextNode("Something went wrong..."));
			
			var errorMessage = document.getElementsByClassName("modal-body")[0];
			errorMessage.innerHTML = "";
			errorMessage.appendChild(document.createTextNode("Please contact administrator."));
			
			var toAppend = createNode("h3", ["well", "well-sm", "text-center"], null);
			switch(xmlHttp.status) {
				case 403:
					toAppend.appendChild(document.createTextNode("Status 403 - Forbidden"));
					break;
				case 404:
					toAppend.appendChild(document.createTextNode("Status 404 - Not Found"));
					break;
				case 500:
					toAppend.appendChild(document.createTextNode("Status 500 - Internal Server Error"));
					break;
			}

			errorMessage.appendChild(toAppend);
			$("#popupMessage").modal("show");
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
	var h3 = createNode("h3", ["text-center"], null);
	var h4 = createNode("h4", ["text-center"], null);
	var small = createNode("small", ["text-center"], null);
	var well = createNode("div", ["well", "well-sm"], null);
	var toAppend = null;
	
	toAppend = h1.cloneNode();
	toAppend.appendChild(document.createTextNode(getSensorNameByType(jsonElement.sensorType)));
	sensorType.appendChild(toAppend);
	
	toAppend = h3.cloneNode();
	toAppend.appendChild(document.createTextNode(jsonElement.roomName));
	
	var subText1 = small.cloneNode();
	subText1.appendChild(document.createTextNode(jsonElement.roomDescription));
	toAppend.appendChild(createNode("br", null, null));
	toAppend.appendChild(subText1);
	
	roomName.appendChild(toAppend);
	roomName.appendChild(createNode("hr", null, null));
	
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
		
		var mainTable = createNode("table", ["table", "table-default"], null);
		for (var index = 0; index < jsonObject.values.length; index++) {
			var tableCol1 = createNode("td", null, null);
			tableCol1.appendChild(document.createTextNode(getReadableDateString(new Date(jsonObject.values[index]["timestamp"].replace(/T|Z|[.]\d{3}/g, " ")))));
			var tableCol2 = createNode("td", null, null);
			tableCol2.appendChild(document.createTextNode(jsonObject.values[index]["data"] + " Celcius"));
			
			var tableRow = createNode("tr", null, null);
			tableRow.appendChild(tableCol1);
			tableRow.appendChild(tableCol2);
			mainTable.appendChild(tableRow);
		}
		var collapseContainer = createNode("div", ["collapse"], [["id", "dataset" + jsonElement.id]]);
		collapseContainer.appendChild(mainTable);
		
		sensorTime.appendChild(divider);
		sensorTime.appendChild(alertDiv);
		
		sensorTime.appendChild(collapseToggle);
		sensorTime.appendChild(collapseContainer);
	}
}

function generateChartBySensorType(jsonObject, domElement, sensorType) {
	var rawData = [];
	for (var index = 0; index < jsonObject.values.length; index++) {
		rawData.push([new Date(jsonObject.values[index]["timestamp"].replace(/T|Z|[.]\d{3}/g, " ")), jsonObject.values[index]["data"]]);
	}
	if (sensorType === "DR") {
		google.charts.setOnLoadCallback(function () {
			var data = new google.visualization.DataTable();
			data.addColumn('datetime', 'X');
			data.addColumn('number', 'Event');
			data.addRows(rawData);

			var options = {
				hAxis: {
					title: 'Time',
					format: 'MMM dd - HH:mm',
					textStyle: {
						fontSize: 10
					}
				},
				vAxis: {
					ticks: [{v:1, f:"Open"}, {v:0, f:"Closed"}],
					textStyle: {
						fontSize: 15
					},
					viewWindow: {
						min: 0,
						max: 1
					},
					gridlines: {
						count: 5
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
	} else if (sensorType === "MO") {
		google.charts.setOnLoadCallback(function () {
			var data = new google.visualization.DataTable();
			data.addColumn('datetime', 'X');
			data.addColumn('number', 'Event');
			data.addRows(rawData);

			var options = {
				hAxis: {
					title: 'Time',
					format: 'MMM dd - HH:mm',
					textStyle: {
						fontSize: 10
					}
				},
				vAxis: {
					textStyle: {
						fontSize: 15
					},
					ticks: [{v:0, f:"None"}, {v:1, f:"Detected"}],
					viewWindow: {
						min: 0,
						max: 1
					},
					gridlines: {
						count: 5
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
				height: 400,
				hAxis: {
					title: 'Time',
					format: 'MMM dd - HH:mm',
					textStyle: {
						fontSize: 10
					}
				},
				vAxis: {
					textStyle: {
						fontSize: 20
					},
					viewWindow: {
						min: 40,
						max: -20
					},
					gridlines: {
						count: 5
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
				height: 400,
				hAxis: {
					title: 'Time',
					format: 'MMM dd - HH:mm',
					textStyle: {
						fontSize: 10
					}
				},
				vAxis: {
					viewWindow: {
						min: 100,
						max: 0
					},
					gridlines: {
						count: 5
					},
					textStyle: {
						fontSize: 20
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
			collapseContainer.appendChild(document.createTextNode(new Date(jsonObject.values[index]["timestamp"].replace(/T|Z|[.]\d{3}/g, " ")) + " - "));
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
			collapseContainer.appendChild(document.createTextNode(getReadableDateString(new Date(jsonObject.values[index]["timestamp"].replace(/T|Z|[.]\d{3}/g, " ")))));
			collapseContainer.appendChild(document.createTextNode(jsonObject.values[index]["data"]));
		}
		
		domElement.appendChild(alertDiv);
		
		domElement.appendChild(collapseToggle);
		domElement.appendChild(collapseContainer);
	}
	return domElement;
}