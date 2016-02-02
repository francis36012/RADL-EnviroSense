package envirosense.repository;


import envirosense.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Francis Agyapong <francis.agyapong@edu.sait.ca>
 */
public interface RoleRepository extends JpaRepository<Role, String>
{
}
