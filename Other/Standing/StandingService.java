package hu.project.formula10.service;

import hu.project.formula10.dto.StandingDTO;
import hu.project.formula10.repository.SeasonRepository;
import hu.project.formula10.repository.StandingRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StandingService {

    private final StandingRepository standingRepository;

    public StandingService(StandingRepository standingRepository) {
        this.standingRepository = standingRepository;
    }

    public Optional<StandingDTO> getStandingByGroupAndSeason(Long groupId, Long seasonId) {
        return standingRepository.findStandingByGroupAndSeason(groupId, seasonId);
    }
}
