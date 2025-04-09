package hu.project.formula10.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import hu.project.formula10.model.Standing;
import hu.project.formula10.model.StandingId;

@Repository
public interface StandingRepository extends JpaRepository<Standing, StandingId> {

    @Query("SELECT s FROM Standing s " +
           "WHERE s.id.groupid = :groupId AND s.id.seasonid = :seasonId")
    List<Standing> findByGroupIdAndSeasonId(@Param("groupId") Long groupId,
                                            @Param("seasonId") Long seasonId);
}