package hu.project.formula10.service;

import hu.project.formula10.model.Season;
import hu.project.formula10.repository.SeasonRepository;
import org.springframework.stereotype.Service;

@Service
public class SeasonService {

    private final SeasonRepository seasonRepository;

    public SeasonService(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    public Season createSeason(Season season) {
        return seasonRepository.save(season);
    }
}
