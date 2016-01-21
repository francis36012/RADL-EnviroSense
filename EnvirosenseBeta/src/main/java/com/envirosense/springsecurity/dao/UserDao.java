package com.envirosense.springsecurity.dao;

import com.envirosense.springsecurity.model.User;

public interface UserDao {

	User findById(int id);
	
	User findBySSO(String sso);
	
}

