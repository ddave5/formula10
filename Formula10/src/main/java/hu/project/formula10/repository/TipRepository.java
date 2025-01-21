package hu.project.formula10.repository;

import hu.project.formula10.model.Race;
import hu.project.formula10.model.Season;
import hu.project.formula10.model.Tip;
import hu.project.formula10.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TipRepository extends JpaRepository<Tip, Long> {

    List<Tip> findByUserAndRace(User user, Race race);
    List<Tip> findByUserAndSeason(User user, Season season);
}
