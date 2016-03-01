package envirosense.service;


import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
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
	
	@Autowired
	Md5PasswordEncoder passwordEncoder;
	
	@Override
	public User save(User user) {
		return userRepository.save(user);
	}
	
	public List<User> save(List<User> users) {
		return userRepository.save(users);
	}
	
	@Override
	public User resetPassword(User user, String newPassword) {
		User dbUser = userRepository.findOne(user.getEmail());
		
		if (dbUser != null) {
			dbUser.setPassword(passwordEncoder.encodePassword(newPassword, null));
			dbUser = userRepository.save(dbUser);
		}
		return dbUser;
	}

	@Override
	public void delete(User user) {
		userRepository.delete(user);
	}

	@Override
	public Set<User> findAllActive() {
		return userRepository.findByEnabledTrue();
	}

	@Override
	public Set<User> finalAllInactive() {
		return userRepository.findByEnabledFalse();
	}

	@Override
	public Set<User> findByFirstname(String firstname) {
		return userRepository.findByFirstname(firstname);
	}

	@Override
	public Set<User> findByLastname(String lastname) {
		return userRepository.findByLastname(lastname);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findOne(email);
	}
}
