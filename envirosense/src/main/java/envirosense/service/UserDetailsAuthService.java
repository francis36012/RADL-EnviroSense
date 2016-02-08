package envirosense.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import envirosense.model.User;
import envirosense.repository.RoleRepository;
import envirosense.repository.UserRepository;

@Service
public class UserDetailsAuthService implements UserDetailsService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findOne(email);

		if (user == null) {
			throw new UsernameNotFoundException(String.format("Email: %s not found", email));
		}
		return new org.springframework.security.core.userdetails.User(user.getEmail(),
				user.getPassword(), user.getEnabled(), true, true, true,
				getGrantedAuthorities(user));
	}

	/**
	 * Returns all roles for the specified user as a list of GrantedAuthorities (roles)
	 * 
	 * @param user The user whose authorities are to be returned
	 * @return A list of authorities for the specified user
	 */
	public List<GrantedAuthority> getGrantedAuthorities(User user) {
		List<GrantedAuthority> authorities = new ArrayList<>();

		user.getRoles().stream().forEach((userRole) -> {
			authorities.add(new SimpleGrantedAuthority("ROLE_" + userRole.getRole()));
		});
		return authorities;
	}
}