package hu.project.formula10.controller;

import hu.project.formula10.dto.ScoreDTO;
import hu.project.formula10.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {
    private final ScoreService scoreService;

    @Autowired
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    // Pontszámítás egy adott tipphez
    @PostMapping("/calculate/{tipId}")
    public ResponseEntity<ScoreDTO> calculatePoints(@PathVariable Long tipId) {
        ScoreDTO points = scoreService.calculatePoints(tipId);
        return ResponseEntity.ok(points);
    }

}
