package com.envirosense.springsecurity.service;

import com.envirosense.springsecurity.dao.UserDao;
import com.envirosense.springsecurity.model.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDao dao;
	
	@Autowired
	private Md5PasswordEncoder md5PasswordEncoder;

	
	//If using Salt, instead of null use Salt object in the encodePassword method
      public void save(User user){
            user.setPassword(md5PasswordEncoder.encodePassword(user.getPassword(), null));
            dao.save(user);
      }
	
	public User findById(int id) {
		return dao.findById(id);
	}

	public User findBySso(String sso) {
		return dao.findBySSO(sso);
	}

      public List<User> findAllUsers() {
            return dao.findAllUsers();
      }
}
