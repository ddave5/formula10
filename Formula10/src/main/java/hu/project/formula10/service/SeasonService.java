package hu.project.formula10.service;

import hu.project.formula10.model.Season;
import hu.project.formula10.repository.SeasonRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SeasonService {

    private final SeasonRepository seasonRepository;

    public SeasonService(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    public Season createSeason(Season season) {
        log.info("Create season");
        return seasonRepository.save(season);
    }
}
