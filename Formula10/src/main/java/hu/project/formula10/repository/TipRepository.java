package hu.project.formula10.repository;

import hu.project.formula10.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TipRepository extends JpaRepository<Tip, Long> {

    @Query("SELECT t FROM Tip t WHERE t.group.id = :groupId AND t.season.id = :seasonId AND t.race.id = :raceId")
    List<Tip> findByGroupIdAndSeasonIdAndRaceId(Long groupId, Long seasonId, Long raceId);

    @Query("SELECT t FROM Tip t WHERE t.group.id = :groupId AND t.season.id = :seasonId AND t.race.id = :raceId AND t.user.id = :userId")
    List<Tip> findAllByGroupIdAndSeasonIdAndRaceIdAndUserId(Long userId, Long groupId, Long seasonId, Long raceId);
}
