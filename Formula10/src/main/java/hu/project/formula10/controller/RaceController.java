package hu.project.formula10.controller;

import hu.project.formula10.dto.RaceDTO;
import hu.project.formula10.service.RaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/races")
public class RaceController {

    private final RaceService raceService;

    public RaceController(RaceService raceService) {
        this.raceService = raceService;
    }

    @GetMapping("/next")
    public ResponseEntity<RaceDTO> getNextRace() {
        Optional<RaceDTO> nextRace = raceService.getNextRace();
        return nextRace.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }
}
