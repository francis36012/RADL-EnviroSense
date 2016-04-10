package envirosense.model.dto;

public class BluetoothDataDTO {
	private int rssi;
	private String beaconId;
	private String userEmail;

	public BluetoothDataDTO(int rssi, String beaconId, String userEmail) {
		super();
		this.rssi = rssi;
		this.beaconId = beaconId;
		this.userEmail = userEmail;
	}

	public int getRssi() {
		return rssi;
	}

	public String getBeaconId() {
		return beaconId;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setRssi(int rssi) {
		this.rssi = rssi;
	}

	public void setBeaconId(String beaconId) {
		this.beaconId = beaconId;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
}