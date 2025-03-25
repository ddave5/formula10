package hu.project.formula10.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import hu.project.formula10.model.ConstructorStanding;

@Repository
public interface ConstructorStandingRepository extends JpaRepository<ConstructorStanding, Long> {
    Optional<List<ConstructorStanding>> findAllBySeasonId(Long seasonId);

    @Query("SELECT cs FROM ConstructorStanding cs WHERE cs.constructor.name = :constructorName")
    Optional<ConstructorStanding> findByConstructorName(String constructorName);
}
