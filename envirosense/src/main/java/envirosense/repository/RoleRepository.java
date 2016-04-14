package envirosense.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import envirosense.model.Role;

public interface RoleRepository extends JpaRepository<Role, String> {
}
