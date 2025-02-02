package hu.project.formula10.repository;

import hu.project.formula10.model.Score;
import hu.project.formula10.model.Tip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository  extends JpaRepository<Score, Long> {
    // Pontszámok lekérdezése adott felhasználó és tipp alapján
    List<Score> findByTip(Tip tip);

    @Query("SELECT SUM(s.point) FROM Score s JOIN s.tip t WHERE t.user.id = :userId AND t.group.id = :groupId AND t.season.id = :seasonId")
    Integer getTotalPointsByUserGroupAndSeason(@Param("userId") Long userId, @Param("groupId") Long groupId, @Param("seasonId") Long seasonId);
}
