package envirosense.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import envirosense.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
	List<Event> findByName(String name);
	List<Event> findByActiveTrue();
	List<Event> findByActiveFalse();
}