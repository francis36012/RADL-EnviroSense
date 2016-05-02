package envirosense.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import envirosense.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
