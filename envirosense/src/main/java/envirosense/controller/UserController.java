package envirosense.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import envirosense.model.User;
import envirosense.model.dto.UserDTO;
import envirosense.service.UserService;

/**
 * Administrative CRUD Controllers for managing users
 *
 * @author Daniel Chau
 */
@Controller
@RequestMapping("/admin/users")
public class UserController {

    @Autowired
    UserService userService;

    /**
     * Save a user to the database
     *
     * @param user the user to be saved
     * @return the user management page
     */
    @RequestMapping(value = {"/save"}, method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ModelAndView saveUser(@RequestBody  UserDTO userDTO) {
    	User user = UserDTO.mapNewUser(userDTO);
        userService.save(user);
        return new ModelAndView("admin/users");
    }
    
    /**
     * Update a user to the database
     *
     * @param user the user to be updated
     * @return the user management page
     */
    @RequestMapping(value = {"/update"}, method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ModelAndView updateUser(@RequestBody UserDTO user) {
    	userService.update(user);
        return new ModelAndView("admin/users");
    }

    /**
     * Save or update a list of two or more users to the database
     *
     * @param users the list of users to be saved or updated
     * @return the user management page
     */
    @RequestMapping(value = {"/saveAll"}, method = RequestMethod.POST)
    public ModelAndView saveUsers(@RequestBody List<User> users) {
        userService.save(users);
        return new ModelAndView("admin/users");
    }

    /**
     * Delete a user from the database
     *
     * @param user the user to be deleted from the database
     * @return the user management page
     */
    @RequestMapping(value = {"/delete"}, method = RequestMethod.POST)
    public ModelAndView deleteUser(@RequestBody User user) {
        userService.delete(user);
        return new ModelAndView("admin/users");
    }

    /**
     * Reset the password for a user. The password should be encrypted or hashed
     * on the client side before the POST request. The UserService will handle
     * the hashed or encrypted password
     *
     * @param user the user whose account password will be reset
     * @param newPassword the encrypted or hashed new password
     * @return the user management page
     */
    @RequestMapping(
            value = {"/resetPassword/{encrytpedPassword}"},
            method = RequestMethod.POST)
    public ModelAndView resetPassword(
            @RequestBody User user,
            @PathVariable("encryptedPassword") String newPassword) {
        userService.resetPassword(user, newPassword);
        return new ModelAndView("admin/users");
    }

    /**
     * Get the page for the specified user by email
     *
     * @param email the unique email address of a user account
     * @return the user management page for the specified user
     */
    @RequestMapping(value = "/email/{email}", method = RequestMethod.GET)
    public ModelAndView getUserByEmail(@PathVariable("email") String email) {
        ModelAndView mv = new ModelAndView("admim/users");
        List<User> users = new ArrayList<>();
        User user = userService.findByEmail(email);
        if (user != null) {
        	users.add(user);
        }
        mv.addObject("users", users);
        return mv;
    }

    /**
     * Get the page for the set of users containing the specified first name
     *
     * @param name the first name of the users to search
     * @return the user management page for the specified users
     */
    @RequestMapping(value = "/firstName/{name}", method = RequestMethod.GET)
    public ModelAndView getUserByFirstName(@PathVariable("name") String name) {
        ModelAndView mv = new ModelAndView("admin/users");
        mv.addObject("users", userService.findByFirstname(name));
        return mv;
    }

    /**
     * Get the page for the set of users containing the specified last name
     *
     * @param name the surname of the users to search
     * @return the user management page for the specified users
     */
    @RequestMapping(value = "/lastName/{name}", method = RequestMethod.GET)
    public ModelAndView getUserByLastName(@PathVariable("name") String name) {
        ModelAndView mv = new ModelAndView("admin/users");
        mv.addObject("users", userService.findByLastname(name));
        return mv;
    }

    /**
     * Get the page for the set for users with an active status
     *
     * @return the user management page for the active users
     */
    @RequestMapping(value = "/active", method = RequestMethod.GET)
    public ModelAndView getActiveUsers() {
        ModelAndView mv = new ModelAndView("admin/users");
        mv.addObject("users", userService.findAllActive());
        return mv;
    }

    /**
     * Get the page for the set for users with an inactive status
     *
     * @return the user management page for the inactive users
     */
    @RequestMapping(value = "/inactive", method = RequestMethod.GET)
    public ModelAndView getInactiveUsers() {
        ModelAndView mv = new ModelAndView("admin/users");
        mv.addObject("users", userService.finalAllInactive());
        return mv;
    }
    
    /**
     * Controller for getting and showing all users
     * @return All users in the system
     */
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ModelAndView getAllUsers() {
        ModelAndView mv = new ModelAndView("admin/users");
        mv.addObject("users", userService.findAll());
        return mv;
    }
}
