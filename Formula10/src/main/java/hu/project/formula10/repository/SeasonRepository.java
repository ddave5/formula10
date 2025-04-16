package hu.project.formula10.repository;

import hu.project.formula10.model.Season;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SeasonRepository extends JpaRepository<Season, Long> {

    @Query(value = "SELECT * FROM season WHERE year = EXTRACT(YEAR FROM CURRENT_DATE)", nativeQuery = true)
    Season findCurrentSeason();
}
