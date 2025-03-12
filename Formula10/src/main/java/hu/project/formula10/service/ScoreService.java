package hu.project.formula10.service;

import hu.project.formula10.dto.ScoreDTO;
import hu.project.formula10.model.*;
import hu.project.formula10.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final TipRepository tipRepository;
    private final ResultsRepository resultsRepository;
    private final GroupRepository groupRepository;
    private final SeasonRepository seasonRepository;

    private static final int[] POINTS_ARRAY = new int[] {1, 2, 4, 6, 8, 10, 12, 15, 18, 25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0};

    public ScoreService(ScoreRepository scoreRepository, TipRepository tipRepository, ResultsRepository resultsRepository, GroupRepository groupRepository, SeasonRepository seasonRepository) {
        this.scoreRepository = scoreRepository;
        this.tipRepository = tipRepository;
        this.resultsRepository = resultsRepository;
        this.groupRepository = groupRepository;
        this.seasonRepository = seasonRepository;
    }

    // Pontszámítás egy adott tipphez a futam eredményei alapján
    public ScoreDTO calculatePoints(Long tipId) {
        log.info("Fetching tip with id: {}", tipId);
        Tip tip = tipRepository.findById(tipId).orElseThrow(() -> new RuntimeException("Tip not found"));
        Race race = tip.getRace();
        Driver predictedDriver = tip.getPredictedTenthPlaceDriver();

        // Futam eredményének lekérdezése
        log.info("Fetching race with id: {}", race.getId());
        List<Results> results = resultsRepository.findByRace(race);
        int points = 0;

        // Pontszámítás - pl. ha a felhasználó eltalálta a 10. helyezettet, akkor kap 10 pontot
        for (Results result : results) {
            if (result.getDriver().equals(predictedDriver)) {
                // Ellenőrizzük, hogy van-e a helyezéshez tartozó pontszám
                points = POINTS_ARRAY[result.getPosition() - 1];
                break;
            }
        }

        // Mentjük a pontszámot
        log.info("Create score");
        Score pointEntry = new Score();
        pointEntry.setTip(tip);
        pointEntry.setPoint(points);
        scoreRepository.save(pointEntry);

        return new ScoreDTO(pointEntry.getId(), pointEntry.getTip().getId(), pointEntry.getPoint());
    }
}
