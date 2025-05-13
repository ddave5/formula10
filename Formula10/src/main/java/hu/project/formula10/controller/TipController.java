package hu.project.formula10.controller;

import hu.project.formula10.dto.TipDTO;
import hu.project.formula10.service.TipService;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<List<TipDTO>> getUserTips(@PathVariable Long userId, @PathVariable Long groupId, @PathVariable Long seasonId, @PathVariable Long raceId) {
        return ResponseEntity.ok(tipService.getUserTips(userId, groupId, seasonId, raceId));
    }

    @PostMapping("")
    public ResponseEntity<TipDTO> createTip(@RequestBody TipDTO tipDTO) {
        return ResponseEntity.ok(tipService.createTip(tipDTO));
    }

    @PutMapping("")
    public ResponseEntity<TipDTO> updateTip(@RequestBody TipDTO tipDTO) throws Exception {
        return ResponseEntity.ok(tipService.updateTip(tipDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTip(@PathVariable Long id) {
        tipService.deleteTip(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/tipsFromGroup/{groupId}")
    public ResponseEntity<Map<String, Boolean>> getGroupMembersTipExist(@PathVariable Long groupId) {
        return ResponseEntity.ok().body(tipService.getTipsFromGroup(groupId));
    }
    
}
