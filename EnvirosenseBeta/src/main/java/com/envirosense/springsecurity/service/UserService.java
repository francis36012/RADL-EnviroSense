package com.envirosense.springsecurity.service;

import com.envirosense.springsecurity.model.User;

public interface UserService {

	User findById(int id);
	
	User findBySso(String sso);
	
}