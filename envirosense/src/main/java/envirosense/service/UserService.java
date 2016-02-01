/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package envirosense.service;

import envirosense.model.User;
import envirosense.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Daniel Chau
 */
@Service
public class UserService {
    
    @Autowired
    UserRepository userRepository;
    
    public List<User> getUsers()
    {
        return userRepository.findAll();
    }
    
    public void add(User user)
    {
       userRepository.save(user);
    }
}
