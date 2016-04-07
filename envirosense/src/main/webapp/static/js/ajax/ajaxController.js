function runAjax(formElement) {
	var dataChoice = formElement.dataChoice.value;
	switch(dataChoice) {
		case "liveDataAllRoomsAndSensors":
			getDataByAllRoomsAndSensors(formElement);
			break;
		
		case "liveDataSensors":
		case "reportSensors":
			getDataBySensorType(formElement);
			break;
			
		case "liveDataRooms":
		case "reportRooms":
			getDataByRoomId(formElement);
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
		case "createUser":
			setDataByUser(formElement);
			break;
			
		default:
			console.error("Data choice not implemented Yet.");
	}
}