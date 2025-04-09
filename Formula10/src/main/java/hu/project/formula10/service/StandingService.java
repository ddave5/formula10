package hu.project.formula10.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import hu.project.formula10.dto.StandingDTO;
import hu.project.formula10.model.Standing;
import hu.project.formula10.repository.StandingRepository;

@Service
public class StandingService {

    private final StandingRepository standingRepository;

    public StandingService(StandingRepository standingRepository) {
        this.standingRepository = standingRepository;
    }

    public List<StandingDTO> getStandingByGroupAndSeason(Long groupId, Long seasonId) {
        return standingRepository.findByGroupIdAndSeasonId(groupId, seasonId)
                .stream()
                .map(Standing::toDTO)
                .collect(Collectors.toList());
    }
}