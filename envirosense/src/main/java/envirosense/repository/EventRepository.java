package envirosense.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import envirosense.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
	public List<Event> findByName(String name);
	public List<Event> findByActiveTrue();
	public List<Event> findByActiveFalse();

	@Query("SELECT e FROM Event e WHERE ?1 MEMBER OF e.owners")
	public List<Event> findByUserEmail(String email);
	
	@Query("SELECT e FROM Event e WHERE ?1 MEMBER OF e.owners AND active = true")
	public List<Event> findByUserEmailActive(String email);

	@Query("SELECT e FROM Event e WHERE ?1 MEMBER OF e.owners AND active = false")
	public List<Event> findByUserEmailInactive(String email);
}