package envirosense.model;


import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;

@Entity
public class Sensor
{
	@Id
	private long id;

	@ManyToOne(targetEntity = Room.class)
	@JoinColumn(name = "room_id")
	private Room room;

	private String name;

	@Enumerated(EnumType.STRING)
	private SensorType sensorType;

	public Sensor(long id, Room room, String name, SensorType sensorType)
	{
		super();
		this.id = id;
		this.room = room;
		this.name = name;
		this.sensorType = sensorType;
	}

	protected Sensor()
	{
	}

	public long getId()
	{
		return id;
	}

	public Room getRoom()
	{
		return room;
	}

	public String getName()
	{
		return name;
	}

	public SensorType getSensorType()
	{
		return sensorType;
	}

	public void setId(long id)
	{
		this.id = id;
	}

	public void setRoom(Room room)
	{
		this.room = room;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public void setSensorType(SensorType sensorType)
	{
		this.sensorType = sensorType;
	}
}
