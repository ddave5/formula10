package hu.project.formula10.controller;

import hu.project.formula10.service.ScoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {
    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    // Pontszámítás egy adott tipphez
    @PostMapping("/calculateForSeason/{seasonId}")
    public ResponseEntity<Void> calculatePoints(@PathVariable Long seasonId) {
        scoreService.calculatePointsPerSeason(seasonId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/calculateforGroup/{groupId}")
    public ResponseEntity<Void> calculatePointsForGroup(@PathVariable Long groupId) {
        calculatePointsForGroup(groupId);
        return ResponseEntity.ok().build();
    }
    

}
