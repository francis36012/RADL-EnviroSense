package envirosense.controller;

import envirosense.model.User;
import envirosense.service.UserServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Administrative CRUD Controllers for managing users
 * @author Daniel Chau
 */
@Controller
@RequestMapping("/admin/user")
public class UserController {

    @Autowired
    UserServiceImpl userService;

    /**
     * Save or update a user to the database
     * @param user the user to be saved or updated
     * @return the user management page
     */
    @RequestMapping(value = {"/save/{user}"}, method = RequestMethod.POST)
    public ModelAndView saveUser(@PathVariable("user") User user) {
        userService.save(user);
        return new ModelAndView("users");
    }
    
    /**
     * Save or update a list of two or more users to the database
     * @param users the list of users to be saved or updated
     * @return the user management page
     */
    @RequestMapping(value = {"/saveAll/{users}"}, method = RequestMethod.POST)
    public ModelAndView saveUsers(@PathVariable("users") List<User> users) {
        userService.save(users);
        return new ModelAndView("users");
    }
    
    /**
     * Delete a user from the database
     * @param user the user to be deleted from the database
     * @return the user management page
     */
    @RequestMapping(value = {"/delete/{user}"}, method = RequestMethod.POST)
    public ModelAndView deleteUser(@PathVariable("user") User user) {
        userService.delete(user);
        return new ModelAndView("users");
    }
    
    /**
     * Reset the password for a user. The password should be encrypted or hashed 
     * on the client side before the POST request. The UserService will handle
     * the hashed or encrypted password
     * @param user the user whose account password will be reset
     * @param newPassword the encrypted or hashed new password
     * @return the user management page
     */
    @RequestMapping(
            value = {"/resetPassword/{user}/{encrytpedPassword}"}, 
            method = RequestMethod.POST)
    public ModelAndView resetPassword(
            @PathVariable("user") User user, 
            @PathVariable("encryptedPassword") String newPassword) {
        userService.resetPassword(user, newPassword);
        return new ModelAndView("users");
    }
    
}
