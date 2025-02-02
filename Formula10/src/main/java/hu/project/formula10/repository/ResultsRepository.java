package hu.project.formula10.repository;

import hu.project.formula10.model.Driver;
import hu.project.formula10.model.Race;
import hu.project.formula10.model.Results;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultsRepository extends JpaRepository<Results, Long> {
    // Eredmények lekérdezése adott futamhoz
    List<Results> findByRace(Race race);

    // Eredmények lekérdezése adott pilótához
    List<Results> findByDriver(Driver driver);
}