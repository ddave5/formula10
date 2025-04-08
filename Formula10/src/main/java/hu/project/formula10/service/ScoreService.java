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
    private final GroupRepository groupRepository;

    private static final int[] POINTS_ARRAY = new int[] {1, 2, 4, 6, 8, 10, 12, 15, 18, 25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0};

    public ScoreService(
            ScoreRepository scoreRepository, 
            TipRepository tipRepository, 
            RaceResultScraper raceResultScraper,
            RaceRepository raceRepository,
            GroupRepository groupRepository
        ) {
            this.scoreRepository = scoreRepository;
            this.tipRepository = tipRepository;
            this.raceResultScraper = raceResultScraper;
            this.raceRepository = raceRepository;
            this.groupRepository = groupRepository;
    }

    public void calculatePoints(Race race) throws IOException {
         
        List<Tip> tips = tipRepository.findAllByRaceId(race.getId()).orElseThrow(() -> new RuntimeException("Tip not found"));

        //Futam eredményének lekérdezése
        log.info("Fetching race with id: {}", race.getId());
        Map<Integer, Integer> results = raceResultScraper.getResult(race);

        saveScore(tips, results);
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

    public void calculatePointsForGroup(Long groupId) throws IOException {
        Race race = raceRepository.findPreviousRace().orElseThrow(() -> new RuntimeException("Race not found"));
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Group not found"));
        List<Tip> tips = tipRepository.findByGroupIdAndSeasonIdAndRaceId(group.getId(),race.getSeason().getId(), race.getId());
        Map<Integer, Integer> results = raceResultScraper.getResult(race);

        saveScore(tips, results);
    }

    private void saveScore(List<Tip> tips, Map<Integer, Integer> results) {
        for (Tip tip : tips) {
            Score score = new Score();
            score.setTip(tip);
            score.setPoint(POINTS_ARRAY[results.get(tip.getPredictedDriver().getRaceNumber()) - 1]);
            scoreRepository.save(score);
        }
    }

}
