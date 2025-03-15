package hu.project.formula10.controller;

import hu.project.formula10.dto.TipDTO;
import hu.project.formula10.model.Tip;
import hu.project.formula10.service.TipService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/tips")
public class TipController {

    private final TipService tipService;

    public TipController(TipService tipService) {
        this.tipService = tipService;
    }

    @GetMapping("/{groupId}/{seasonId}/{raceId}")
    public ResponseEntity<List<TipDTO>> getTipsForGroupSeasonAndRace(@PathVariable Long groupId, @PathVariable Long seasonId, @PathVariable Long raceId) {
        return ResponseEntity.ok().body(tipService.getTipsForGroupSeasonAndRace(groupId, seasonId, raceId));
    }

    @GetMapping("/{groupId}/{seasonId}/{raceId}/user/{userId}")
    public ResponseEntity<TipDTO> getUserTip(@PathVariable Long userId, @PathVariable Long groupId, @PathVariable Long seasonId, @PathVariable Long raceId) {
        try {
            return ResponseEntity.ok(tipService.getUserTip(userId, groupId, seasonId, raceId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping
    public ResponseEntity<TipDTO> createTip(@RequestBody TipDTO tipDTO) {
        try {
            return ResponseEntity.ok(tipService.createTip(tipDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("")
    public ResponseEntity<Tip> updateTip(@RequestBody TipDTO tipDTO) {
        try {
            return ResponseEntity.ok(tipService.updateTip(tipDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTip(@PathVariable Long id) {
        tipService.deleteTip(id);
        return ResponseEntity.ok().build();
    }

    
}
