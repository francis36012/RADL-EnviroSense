/*
 * To change this license header, choose License Headers in Project Properties. To change this template file,
 * choose Tools | Templates and open the template in the editor.
 */
package envirosense.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import envirosense.model.User;
import envirosense.repository.UserRepository;

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
	public boolean login(String username, String password) {
		User user = userRepository.findByEmailAndPassword(username, password);
		return user != null;
	}
}
