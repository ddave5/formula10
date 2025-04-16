package hu.project.formula10.service;

import java.util.List;

import org.springframework.stereotype.Service;

import hu.project.formula10.dto.StandingDTO;
import hu.project.formula10.model.Season;
import hu.project.formula10.repository.SeasonRepository;
import hu.project.formula10.repository.StandingRepositoryImpl;

@Service
public class StandingService {

    private final StandingRepositoryImpl standingRepository;
    private final SeasonRepository seasonRepository;

    public StandingService(StandingRepositoryImpl standingRepository, SeasonRepository seasonRepository) {
        this.standingRepository = standingRepository;
        this.seasonRepository = seasonRepository;
    }

    public List<StandingDTO> getStandingByGroupAndSeason(Long groupId) {
        Season season = seasonRepository.findCurrentSeason();
        return standingRepository.findByGroupIdAndSeasonId(groupId, season.getId());
    }
}