package envirosense.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * This class models a room in the system's environment
 * 
 * @author Francis Agyapong <francis.agyapong@edu.sait.ca>
 */
@Entity
public class Room
{
	/** The ID of the room object */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	/** The name of the room object */
	private String name;

	/** The description of the room object */
	private String description;

	/**
	 * Creates a room object using the parameters passed in
	 * 
	 * @param id
	 *            The ID of the room object to be created
	 * @param name
	 *            The name of the room object to be created
	 * @param description
	 *            The description of the room object to be created
	 */
	public Room(long id, String name, String description)
	{
		this.id = id;
		this.name = name;
		this.description = description;
	}

	protected Room()
	{
	}

	/**
	 * Returns the ID of the room object
	 * 
	 * @return The ID of the room object
	 */
	public long getId()
	{
		return id;
	}

	/**
	 * Returns the name of the room object
	 * 
	 * @return The name of the room object
	 */
	public String getName()
	{
		return name;
	}

	/**
	 * Returns the description of the room object
	 * 
	 * @return The description of the room object
	 */
	public String getDescription()
	{
		return description;
	}

	/**
	 * Sets the ID for the room object
	 * 
	 * @param id
	 *            The ID to set
	 */
	public void setId(long id)
	{
		this.id = id;
	}

	/**
	 * Sets the name for the room object
	 * 
	 * @param name
	 *            The name to set
	 */
	public void setName(String name)
	{
		this.name = name;
	}

	/**
	 * Sets the description for the room object
	 * 
	 * @param description
	 *            The description to set
	 */
	public void setDescription(String description)
	{
		this.description = description;
	}
}
