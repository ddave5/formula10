package hu.project.formula10.service;

import hu.project.formula10.bot.RaceResultScraper;
import hu.project.formula10.model.*;
import hu.project.formula10.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
@Slf4j
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final TipRepository tipRepository;
    private final RaceResultScraper raceResultScraper;
    private final RaceRepository raceRepository;

    private static final int[] POINTS_ARRAY = new int[] {1, 2, 4, 6, 8, 10, 12, 15, 18, 25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0};

    public ScoreService(
            ScoreRepository scoreRepository, 
            TipRepository tipRepository, 
            RaceResultScraper raceResultScraper,
            RaceRepository raceRepository
        ) {
            this.scoreRepository = scoreRepository;
            this.tipRepository = tipRepository;
            this.raceResultScraper = raceResultScraper;
            this.raceRepository = raceRepository;
    }

    // Pontszámítás egy adott tipphez a futam eredményei alapján
    public void calculatePoints(Race race) throws IOException {
         
        List<Tip> tips = tipRepository.findAllByRaceId(race.getId()).orElseThrow(() -> new RuntimeException("Tip not found"));

        //Futam eredményének lekérdezése
        log.info("Fetching race with id: {}", race.getId());
        Map<String, Integer> results = raceResultScraper.getResult(race);

        //Pontszámítás
        for (Tip tip : tips) {
            Score score = new Score();
            score.setTip(tip);
            score.setPoint(POINTS_ARRAY[results.get(tip.getPredictedDriver().getName()) - 1]);
            scoreRepository.save(score);
        }
    
    }

    public void calculatePointsPerSeason(Long seasonId) {
        List<Race> races = raceRepository.findAllPreviousRacesBySeasonId(seasonId).orElseThrow(() -> new RuntimeException("Races not found"));

        for (Race race : races) {
            try {
                calculatePoints(race);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }



}
