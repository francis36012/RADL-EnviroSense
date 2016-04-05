function runAjax(formElement) {
	var dataChoice = formElement.dataChoice.value;
	switch(dataChoice) {
		case "ALL":
			getDataByAllSensors(formElement);
			break;
		
		case "liveDataSensors":
		case "reportSensors":
			getDataBySensorType(formElement);
			break;
			
		case "liveDataRooms":
		case "reportRooms":
			getDataByRoom(formElement);
			break;
			
		case "liveDataSettings":
		case "reportSettings":
			getDataByPageSettings(formElement);
			break;
			
		case "eventToggle":
			setDataByEventId(formElement);
			break;
			
		case "saveUser":
		case "deleteUser":
			setDataByUser(formElement);
			break;
			
		default:
			console.error("Data choice not implemented Yet.");
	}
}