package hu.project.formula10.repository;

import hu.project.formula10.model.Race;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.Optional;

@Repository
public interface RaceRepository extends JpaRepository<Race, Long> {

    @Query("SELECT r FROM Race r WHERE r.raceStart > CURRENT_TIMESTAMP ORDER BY r.raceStart ASC limit 1")
    Optional<Race> findNextRace();
}
