package envirosense.service;

import envirosense.model.User;
import java.util.List;

/**
 * Interface for the Services of a User
 * @author Daniel Chau
 */
public interface UserService {
    
    /**
     * Get a list of all the users
     * @return a list of all the User objects
     */
    List<User> getAllUsers();

    /**
     * Find a user by email
     * @param email the email of the user to find
     * @return the User object that is found
     */
    User getUser(String email);

    /**
     * Determines if the user exists according to the email
     * @param user the User object to search
     * @return true if the email exists, false if the email does not exist
     */
    boolean isUserExist(User user);

    /**
     * Adds a user to the database only if the user's email does not exist
     * @param user the user object to add
     */
    void addUser(User user);
    
    /**
     * Remove a user from the database using specified by the email address of the user
     * @param email the email address of the user to remove
     */
    void deleteUser(String email);
    
    /**
     * Update a user with new information only if the user's email address exists
     * @param user the user, with the email address as a key, to update
     */
    void updateUser(User user);

}
