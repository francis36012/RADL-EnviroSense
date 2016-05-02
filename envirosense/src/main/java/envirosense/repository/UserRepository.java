package envirosense.repository;


import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import envirosense.model.User;

/**
 * Repository for retrieving users from the database
 * 
 * @author Daniel Chau
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {

	/**
	 * Returns all active users
	 * @return All active users
	 */
	public Set<User> findByEnabledTrue();

	/**
	 * Returns all inactive users
	 * @return All inactive users
	 */
	public Set<User> findByEnabledFalse();

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
	 * Returns the user with the specified email.
	 * @param email The email of the user to return
	 * @return A user object whose email matches (case insensitive) the one specified
	 */
	public User findByEmailIgnoreCase(String email);

	/**
	 * Returns all users whose last name match the last name provided
	 * @param firstname The last name to check form
	 * @return All users whose last name match (case insensitive) the last name provided
	 */
	public Set<User> findByLastnameIgnoreCase(String lastname);

	/**
	 * Returns all users whose first name match the first name provided
	 * @param firstname The first name to check form
	 * @return All users whose first name match (case insensitive) the first name provided
	 */
	public Set<User> findByFirstnameIgnoreCase(String firstname);
}
