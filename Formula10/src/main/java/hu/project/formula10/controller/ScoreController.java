package hu.project.formula10.controller;

import hu.project.formula10.dto.ScoreDTO;
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
    @PostMapping("/calculate/{seasonId}")
    public ResponseEntity<ScoreDTO> calculatePoints(@PathVariable Long seasonId) {
        scoreService.calculatePointsPerSeason(seasonId);
        return ResponseEntity.ok().build();
    }

}
