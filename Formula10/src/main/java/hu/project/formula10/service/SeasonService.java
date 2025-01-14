package hu.project.formula10.service;

import hu.project.formula10.enums.SeasonStatus;
import hu.project.formula10.model.Season;
import hu.project.formula10.repository.SeasonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeasonService {

    private final SeasonRepository seasonRepository;

    public SeasonService(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    public Season createSeason(Season season) {
        return seasonRepository.save(season);
    }

    public Season archiveSeason(Long seasonId) {
        Season season = seasonRepository.findById(seasonId)
                .orElseThrow(() -> new RuntimeException("Season not found"));
        season.setStatus(SeasonStatus.ARCHIVED);
        return seasonRepository.save(season);
    }

    public List<Season> getSeasonsByGroupId(Long groupId) {
        return seasonRepository.findByGroupId(groupId);
    }
}
