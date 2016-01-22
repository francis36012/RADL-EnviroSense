package com.envirosense.springsecurity.dao;

import com.envirosense.springsecurity.model.UserProfile;
import java.util.List;

public interface UserProfileDao {

	List<UserProfile> findAll();
	
	UserProfile findByType(String type);
	
	UserProfile findById(int id);
}
