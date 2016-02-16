package envirosense.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import envirosense.model.Condition;

@Repository
public interface ConditionRepository extends JpaRepository<Condition, Long> {
}