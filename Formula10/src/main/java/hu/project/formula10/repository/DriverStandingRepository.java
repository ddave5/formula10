package hu.project.formula10.repository;

import java.util.List;


import hu.project.formula10.model.DriverStanding;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverStandingRepository extends JpaRepository<DriverStanding, Long> {

    Optional<List<DriverStanding>> findAllBySeasonId(Long seasonId);

    @Query("SELECT ds FROM DriverStanding ds WHERE ds.driver.name = :driverName")
    Optional<DriverStanding> findByDriverName(String driverName);
    
}
