package hu.project.formula10.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import hu.project.formula10.dto.StandingDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;


@Repository
public class StandingRepositoryImpl implements StandingRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<StandingDTO> findByGroupIdAndSeasonId(Long groupId, Long seasonId) {
        return em.createQuery("""
            SELECT new hu.project.formula10.dto.StandingDTO(
                s.id.groupid,
                s.id.seasonid,
                s.season.year,
                s.id.userid,
                s.user.username,
                s.totalPoints
            )
            FROM Standing s
            WHERE s.id.groupid = :groupId AND s.id.seasonid = :seasonId
            order by s.totalPoints desc
        """, StandingDTO.class)
        .setParameter("groupId", groupId)
        .setParameter("seasonId", seasonId)
        .getResultList();
    }
}