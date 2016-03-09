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
function getDataByPageSettings(dataChoice, domElement) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		readyStateChangeByPageSettings(xmlHttp, domElement);
	};
	xmlHttp.open("GET", "/envirosense/api/sensor/all", true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the
 * connection from the server. If it get a response from the server, it will do
 * the necessary process to parse the JSON object where appropriate.
 */
function readyStateChangeByPageSettings(xmlHttp, domElement) {
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
						 * Load up the "Settings" slide with data from a JSON call and add it to
						 * SLICK as slides.
						 */
						var settingsPanel = createPanel();
						$(".single-items").slick("slickAdd", settingsPanel);
						
						var toAppend = createContainerByPageSettings(domElement.dataChoice.value)
						var appendContainer = settingsPanel.getElementsByClassName("panel-body")[0];
						appendContainer.appendChild(toAppend);
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
	
	var panelTitle = domElement.getElementsByClassName("panel-heading")[0];
	panelTitle.innerHTML = "Settings";
	
	var listContainer = domElement.getElementsByClassName("dropdown-toggle")[0];
	var listContentsContainer = domElement.getElementsByClassName("dropdown-menu")[0];
	var listSeperator = createNode("li", ["divider"], [["role", "seperator"]], null);
	
	var listCategorySensor = createNode("li", ["dropdown-header"], null);
	var sensorCategory = createNode("h3", null, null);
	sensorCategory.innerHTML = "Sensors";
	
	var listCategoryRoom = createNode("li", ["dropdown-header"], null);
	var roomCategory = createNode("h5", null, null);
	roomCategory.innerHTML = "Rooms";
	
	listCategorySensor.appendChild(sensorCategory);
	listContentsContainer.appendChild(listCategorySensor);
	
	for (var index = 0; index < jsonObject.length; index++) {
		var jsonElement = {
			id: jsonObject[index]["id"],
			name: jsonObject[index]["name"],
			sensorType: jsonObject[index]["sensorType"],
			room: {
				id: jsonObject[index]["room"]["id"],
				name: jsonObject[index]["room"]["name"],
				description: jsonObject[index]["room"]["description"]
			}
		};
		var sensorType = getSensorNameByType(jsonElement.sensorType)
		var sensorName = createNode("a", null, [["value", jsonElement.sensorType]]);
		sensorName.innerHTML = sensorType;
		
		var sensorEntry = createNode("li", ["sensorEntry"], null);
		sensorEntry.appendChild(sensorName);
		listContentsContainer.appendChild(sensorEntry);
	};
	
	listContentsContainer.appendChild(listSeperator);
	listCategoryRoom.appendChild(roomCategory);
	
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