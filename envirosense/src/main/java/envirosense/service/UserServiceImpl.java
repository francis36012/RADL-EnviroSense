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
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementation of the Services for users
 *
 * @author Daniel Chau
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(String email) {
        return userRepository.findOne(email);
    }

    @Override
    public boolean isUserExist(User user) {
        return getUser(user.getEmail()) != null;
    }

    @Override
    public void addUser(User user) {
        if (!isUserExist(user)) {
            userRepository.save(user);
        }
    }

    @Override
    public void deleteUser(String email) {
        userRepository.delete(email);
    }

    @Override
    public void updateUser(User user) {
        if (isUserExist(user)) {
            userRepository.save(user);
        }
    }
}
