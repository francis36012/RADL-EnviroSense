/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would
 * have an "On Ready State Change" that would run a function once it sends a
 * request to the server.
 */

/**
 * 
 * @param String dataChoice - The name of the webpage to determine the 
 * appropriate content for the settings panel.
 * 
 * @param Element domElement - The container that will be filled with the
 * content.
 * @returns {undefined}
 */
function getDataByPageSettings(formElement) {
	var dataCategory = formElement.category.value;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		readyStateChangeByPageSettings(xmlHttp, formElement);
	};
	xmlHttp.open("GET", "/envirosense/api/" + dataCategory + "/all", true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChangeByPageSettings(xmlHttp, formElement) {
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
				try {
					var jsonObject = JSON.parse(xmlHttp.responseText);

					if (jsonObject !== null) {
						
						/*
						 * Check to see if the settings panel exist. This 
						 * asynchronous AJAX call doesn't know this because
						 * in the report form, we have to call this AJAX twice,
						 * both for Sensors and Rooms. We don't want to create
						 * the panel twice.
						 */
						var settingsPanel = document.getElementById("reportForm");
						if (settingsPanel === null) {
							/*
							 * Load up the "Settings" slide with data from a JSON call and add it to
							 * SLICK as slides.
							 */
							settingsPanel = createPanel();
							$(".single-items").slick("slickAdd", settingsPanel);
							
							var toAppend = createContainerByPageSettings(formElement.dataChoice.value);
							var appendContainer = settingsPanel.getElementsByClassName("panel-body")[0];
							appendContainer.appendChild(toAppend);
						}
						
						loadDataByPageSettings(jsonObject, settingsPanel);
					} else {
						//No Data Found
					}
				} catch (errorEvent) {
					//Problem parsing JSON object
					//Generate Error Box
					throw errorEvent;
				}
			}
		} else if (xmlHttp.status === 404) {
			//Can't connect
		}
	} catch (errorEvent) {
		throw errorEvent;
	}
}


/* ---------------------------------------- */
/*				DATA LOADER					*/
/* ---------------------------------------- */

function loadDataByPageSettings(jsonObject, domElement) {
	
	var settingsContainerFlag = domElement.getElementsByClassName("panel")[0] !== undefined;
	if (settingsContainerFlag) {
		var panelTitle = domElement.getElementsByClassName("panel-heading")[0];
		panelTitle.innerHTML = "Settings";
		
		var settingsContainer = domElement.getElementsByClassName("panel-body")[0];
		var toggleButton = settingsContainer.getElementsByTagName("button")[0];
		
		var formGroup = settingsContainer.getElementsByClassName("form-group");
		var settingsLabel1 = formGroup[1].getElementsByTagName("label")[0];
		var settingsInput1 = formGroup[1].getElementsByTagName("input")[0];
		var settingsLabel2 = formGroup[2].getElementsByTagName("label")[0];
		var settingsInput2 = formGroup[2].getElementsByTagName("input")[0];

		toggleButton.setAttribute("href", "#toggleButton");
		toggleButton.innerHTML  = "Category";

		settingsLabel1.setAttribute("for", "fromDate");
		settingsLabel2.setAttribute("for", "toDate");
		settingsInput1.setAttribute("name", "fromDate");
		settingsInput2.setAttribute("name", "toDate");
	}
	
	var listContainer = domElement.getElementsByClassName("dropdown-menu")[0];
	var listSeperator = createNode("li", ["divider"], [["role", "seperator"]], null);
	
	var dataList = {}
	var dataChoice = null;
	
	for (var index = 0; index < jsonObject.length; index++) {
		var jsonElement = null;
		
		if (jsonObject[index]["room"] !== undefined) {
			/*
			 * This JSON object holds data for all sensors because it has
			 * a speific room assigned to each of the sensor records. A room
			 * doesn't have a room assigned to it. That would be silly.
			 */
			dataChoice = "Sensor";
			jsonElement = {
				id: jsonObject[index]["id"],
				name: jsonObject[index]["name"],
				sensorType: jsonObject[index]["sensorType"],
				room: {
					id: jsonObject[index]["room"]["id"],
					name: jsonObject[index]["room"]["name"],
					description: jsonObject[index]["room"]["description"]
				}
			};
			
			var sensorType = getSensorNameByType(jsonElement.sensorType);
			var sensorName = createNode("a", null, [["value", jsonElement.sensorType]]);
			sensorName.innerHTML = sensorType;

			var sensorEntry = createNode("li", ["sensorEntry"], null);
			sensorEntry.appendChild(sensorName);

			dataList[jsonElement.sensorType] = sensorEntry;
				
		} else {
			
			/*
			 * This JSON object holds data for all rooms because it doesn't
			 * have a room assigned to it. That would be silly.
			 */
			dataChoice = "Room";
			jsonElement = {
				id: jsonObject[index]["id"],
				name: jsonObject[index]["name"],
				description: jsonObject[index]["description"],
			};
			
			/*
			 * The reason why we append the ID of the rooms at the end is 
			 * because there are rooms with the same name but with a different
			 * ID. A way to differentiate these is to use their ID as part
			 * of their name to make them unique to each other in some way.
			 */
			var roomName = createNode("a", null, [["value", jsonElement.name]]);
			roomName.innerHTML = jsonElement.name + " - ID: " + jsonElement.id;
			
			var roomEntry = createNode("li", ["roomEntry"], null);
			roomEntry.appendChild(roomName);
			
			dataList[jsonElement.name + " - ID: " + jsonElement.id] = roomEntry;
		}
	};
	
	var dataCategory = createNode("h3", null, null);
	dataCategory.innerHTML = dataChoice;
	
	var listCategory = createNode("li", ["dropdown-header"], null);
	listCategory.appendChild(dataCategory);
	listContainer.appendChild(listCategory);
	
	var allData = Object.keys(dataList);
	for (var index = 0; index < allData.length; index++) {
		listContainer.appendChild(dataList[allData[index]]);
	}
	
	listContainer.appendChild(listSeperator);
	
	
}