package envirosense.service;


import java.security.SecureRandom;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import envirosense.model.User;
import envirosense.model.dto.UserDTO;
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
		User dbUser = userRepository.findByEmailIgnoreCase(user.getEmail());
		// email already exists
		if (dbUser != null) {
			return null;
		}

		user.setSalt(byteToHex(generateRandom(32)));
		user.setPassword(passwordEncoder.encodePassword(user.getPassword(), user.getSalt()));
		user.setEnabled(true);
		return userRepository.save(user);
	}
	
	@Override
	public List<User> save(List<User> users) {
		return userRepository.save(users);
	}
	
	@Override
	public User update(UserDTO userDTO) {
		if (userDTO.getEmail() == null) {
			return null;
		}
		User dbUser = userRepository.findByEmailIgnoreCase(userDTO.getEmail());
		
		String dtoFirstname = userDTO.getFirstname();
		String dtoLastname = userDTO.getLastname();
		String dtoPassword = userDTO.getPassword();
		String dtoPhone = userDTO.getPhone();
		String dtoSlack = userDTO.getPhone();

		if (dtoFirstname != null) {
			dbUser.setFirstname(dtoFirstname);
		}
		if (dtoLastname != null) {
			dbUser.setLastname(dtoLastname);
		}
		if (dtoPassword != null) {
			dbUser.setSalt(byteToHex(generateRandom(32)));
			dbUser.setPassword(passwordEncoder.encodePassword(dtoPassword, dbUser.getSalt()));
		}
		if (dtoPhone != null) {
			dbUser.setPhone(dtoPhone);
		}
		if (dtoSlack != null) {
			dbUser.setSlackId(dtoSlack);
		}
		return userRepository.save(dbUser);
	}
	
	@Override
	public User resetPassword(User user, String newPassword) {
		User dbUser = userRepository.findByEmailIgnoreCase(user.getEmail());
		
		if (dbUser != null) {
			dbUser.setSalt(byteToHex(generateRandom(32)));
			dbUser.setPassword(passwordEncoder.encodePassword(newPassword, dbUser.getSalt()));
			dbUser = userRepository.save(dbUser);
		}
		return dbUser;
	}

	@Override
	public void delete(User user) {
		userRepository.delete(user);
		userRepository.flush();
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
		return userRepository.findByFirstnameIgnoreCase(firstname);
	}

	@Override
	public Set<User> findByLastname(String lastname) {
		return userRepository.findByLastnameIgnoreCase(lastname);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmailIgnoreCase(email);
	}
	
	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}
	
	/**
	 * Returns n randomly generated bytes
	 * @param n The number of random bytes to return
	 * @return n randomly generated bytes
	 */
	private static byte[] generateRandom(int n) {
		SecureRandom random = new SecureRandom();
		byte[] output = new byte[n];
		random.nextBytes(output);
		return output;
	}
	
	/**
	 * Converts the input byte array to a hex sequence
	 * @param input The byte array to convert to hex sequence
	 * @return A hex sequence of the input byte array
	 */
	private String byteToHex(byte[] input) {
		StringBuilder sbuilder = new StringBuilder();
		
		for (byte b : input) {
			byte upper = (byte)((b >>> 4) & 0x0f);
			byte lower = (byte)(b & 0x0f);
			sbuilder.append(toHex(upper));
			sbuilder.append(toHex(lower));
		}
		return sbuilder.toString();
	}
	
	/**
	 * Converts the lower 4 bits of input to a hex character
	 * @param input the byte whose lower 4 bits is to be converted
	 * @return A hex character mapping to the lower 4 bits of the input byte
	 * @throws IllegalArgumentException If the input byte is greater than 15 or less than 0
	 */
	private char toHex(byte input) throws IllegalArgumentException {
		char output = '\u0000';
		if (0 > input || input > 15) {
			throw new IllegalArgumentException("Input byte must be be in the range [0, 15]. " + input + "given");
		}
		int lower = input & 0x0f;
		if (0 <= lower && lower <= 9) {
			output = (char)('0' + lower);
		} else {
			output = (char)('a' + (lower - 10));
		}
		return output;
	}
}
