package hu.project.formula10.repository;

import java.util.List;

import hu.project.formula10.dto.StandingDTO;

public interface StandingRepository {
     List<StandingDTO> findByGroupIdAndSeasonId(Long groupId, Long seasonId);
}
