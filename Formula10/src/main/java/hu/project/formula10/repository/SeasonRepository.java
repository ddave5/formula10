package hu.project.formula10.repository;

import hu.project.formula10.model.Season;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeasonRepository extends JpaRepository<Season, Long> {
    List<Season> findByGroupId(Long groupId);
}
