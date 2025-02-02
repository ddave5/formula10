package hu.project.formula10.service;

import hu.project.formula10.dto.ScoreDTO;
import hu.project.formula10.dto.StandingDTO;
import hu.project.formula10.model.*;
import hu.project.formula10.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final TipRepository tipRepository;
    private final ResultsRepository resultsRepository;
    private final GroupRepository groupRepository;
    private final SeasonRepository seasonRepository;

    private static final int[] POINTS_ARRAY = new int[] {1, 2, 4, 6, 8, 10, 12, 15, 18, 25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0};


    @Autowired
    public ScoreService(ScoreRepository scoreRepository, TipRepository tipRepository, ResultsRepository resultsRepository, GroupRepository groupRepository, SeasonRepository seasonRepository) {
        this.scoreRepository = scoreRepository;
        this.tipRepository = tipRepository;
        this.resultsRepository = resultsRepository;
        this.groupRepository = groupRepository;
        this.seasonRepository = seasonRepository;
    }

    // Pontszámítás egy adott tipphez a futam eredményei alapján
    public ScoreDTO calculatePoints(Long tipId) {
        Tip tip = tipRepository.findById(tipId).orElseThrow(() -> new RuntimeException("Tip not found"));
        Race race = tip.getRace();
        Driver predictedDriver = tip.getPredictedTenthPlaceDriver();

        // Futam eredményének lekérdezése
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
        Score pointEntry = new Score();
        pointEntry.setTip(tip);
        pointEntry.setPoint(points);
        scoreRepository.save(pointEntry);

        return new ScoreDTO(pointEntry.getId(), pointEntry.getTip().getId(), pointEntry.getPoint());
    }

    // Ranglista lekérdezése egy adott csoportban és szezonban
    public List<StandingDTO> getLeaderboard(Long groupId, Long seasonId) {
        List<StandingDTO> leaderboard = new ArrayList<>();

        Group group = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Group not found"));
        Season season = seasonRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Season not found"));

        // Minden felhasználó pontszámának lekérdezése az adott csoport és szezon alapján
        List<Tip> tips = tipRepository.findByGroupAndSeason(group, season);
        Set<User> users = tips.stream().map(Tip::getUser).collect(Collectors.toSet());

        for (User user : users) {
            Integer totalPoints = scoreRepository.getTotalPointsByUserGroupAndSeason(user.getId(), groupId, seasonId);
            leaderboard.add(new StandingDTO(groupId, seasonId, user.getId(), totalPoints != null ? totalPoints : 0));
        }

        // Ranglista rendezése pontszám szerint csökkenő sorrendben
        leaderboard.sort(Comparator.comparingInt(StandingDTO::getTotalPoints).reversed());

        return leaderboard;
    }
}
