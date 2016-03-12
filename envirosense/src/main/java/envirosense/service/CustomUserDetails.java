package envirosense.service;


import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;

	private final String username;
	private final String password;
	private final String salt;
	private final boolean enabled;
	private final Collection<? extends GrantedAuthority> authorities;
	
	public CustomUserDetails(String username, String password, String salt, boolean enabled,
			Collection<? extends GrantedAuthority> authorities) {
		this.username = username;
		this.password = password;
		this.salt = salt;
		this.enabled = enabled;
		this.authorities = authorities;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}
	
	public String getSalt() {
		return salt;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}
}