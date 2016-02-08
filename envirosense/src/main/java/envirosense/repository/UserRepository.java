/*
 * To change this license header, choose License Headers in Project Properties. To change this template file,
 * choose Tools | Templates and open the template in the editor.
 */
package envirosense.repository;


import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import envirosense.model.User;

/**
 * Repository for Users
 * 
 * @author Daniel Chau
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
	public User findByEmailAndPassword(String email, String password);

	public Set<User> findByEnabledTrue();

	public Set<User> findByEnabledFalse();
}
