package envirosense.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import envirosense.model.Role;

/**
 * @author Francis Agyapong <francis.agyapong@edu.sait.ca>
 */
public interface RoleRepository extends JpaRepository<Role, String> {
}
