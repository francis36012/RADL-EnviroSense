package com.envirosense.springsecurity.dao;

import com.envirosense.springsecurity.model.User;
import java.util.List;

public interface UserDao {

	void save(User user);
	
	User findById(int id);
	
	User findBySSO(String sso);
      
      List<User> findAll();
	
}

