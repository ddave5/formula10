package hu.project.formula10.controller;

import hu.project.formula10.dto.TipDTO;
import hu.project.formula10.service.TipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tips")
public class TipController {

    private final TipService tipService;

    public TipController(TipService tipService) {
        this.tipService = tipService;
    }

    @PostMapping("/add")
    public ResponseEntity<TipDTO> addTip(@RequestBody TipDTO tipDTO) {
        TipDTO createdTip = tipService.createTip(tipDTO);
        return ResponseEntity.ok(createdTip);
    }

    @GetMapping("/user/{userId}/race/{raceId}")
    public ResponseEntity<List<TipDTO>> getTipsForUserAndRace(@PathVariable Long userId, @PathVariable Long raceId) {
        List<TipDTO> tips = tipService.getTipsForUserAndRace(userId, raceId);
        return ResponseEntity.ok(tips);
    }
}
