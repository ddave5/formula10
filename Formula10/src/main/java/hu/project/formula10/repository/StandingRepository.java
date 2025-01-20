package hu.project.formula10.repository;

import hu.project.formula10.dto.StandingDTO;
import hu.project.formula10.model.Standing;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StandingRepository extends CrudRepository<Standing, Long> {

    @Query("SELECT new hu.project.formula10.dto.StandingDTO(t.group.id, t.season.id, t.user.id, SUM(sc.point)) " +
            "FROM Tip t JOIN Score sc ON t.id = sc.tip.id " +
            "WHERE t.group.id = :groupId AND t.season.id = :seasonId " +
            "GROUP BY t.group.id, t.season.id, t.user.id")
    Optional<StandingDTO> findStandingByGroupAndSeason(Long groupId, Long seasonId);
}