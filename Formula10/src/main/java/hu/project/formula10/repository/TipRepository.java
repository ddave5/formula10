package hu.project.formula10.repository;

import hu.project.formula10.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TipRepository extends JpaRepository<Tip, Long> {

    List<Tip> findByGroupIdAndSeasonIdAndRaceId(Long groupId, Long seasonId, Long raceId);
    Optional<Tip> findByUserIdAndGroupIdAndSeasonIdAndRaceId(Long userId, Long groupId, Long seasonId, Long raceId);
}
