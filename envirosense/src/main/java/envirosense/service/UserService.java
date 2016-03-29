package envirosense.service;

import java.util.List;
import java.util.Set;

import envirosense.model.User;

/**
 * Interface for the Services of a User
 * 
 * @author Daniel Chau
 */
public interface UserService {

	/**
	 * Saves the provided user to the database
	 * @param user The user that is to be saved
	 * @return The saved user
	 */
	public User save(User user);

	/**
	 * Save the list of users provided to the database
	 * @param users The users to save
	 * @return The saved users
	 */
	public List<User> save(List<User> users);
	
	/**
	 * Deletes the specified user from the database
	 * @param user The user to delete
	 */
	public void delete(User user);
	
	/**
	 * Reset the password of the specified user to the specified new password
	 * @param user The user whose password is to be reset
	 * @param newPassword The new password to set
	 * @return
	 */
	public User resetPassword(User user, String newPassword);

	/**
	 * Returns all active users
	 * @return All active users
	 */
	public Set<User> findAllActive();
	
	/**
	 * Returns all inactive users
	 * @return All inactive users
	 */
	public Set<User> finalAllInactive();
	
	/**
	 * Returns all users whose first name match the first name provided
	 * @param firstname The first name to check form
	 * @return All users whose first name match the first name provided
	 */
	public Set<User> findByFirstname(String firstname);
	
	/**
	 * Returns all users whose last name match the last name provided
	 * @param firstname The last name to check form
	 * @return All users whose last name match the last name provided
	 */
	public Set<User> findByLastname(String lastname);
	
	/**
	 * Returns the user whose email address matches the email specified
	 * @param email The email to use for search
	 * @return The user with email address specified
	 */
	public User findByEmail(String email);
	
	/**
	 * Returns all users stored in the database
	 * @return All the users in the database
	 */
	public List<User> findAll();
}
