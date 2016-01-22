package com.envirosense.springsecurity.service;

import com.envirosense.springsecurity.model.User;
import java.util.List;

public interface UserService {

	void save(User user);
	
	User findById(int id);
	
	User findBySso(String sso);
      
      List<User> findAllUsers();
	
}