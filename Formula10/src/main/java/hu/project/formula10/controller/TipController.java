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

    @PostMapping("/user/{userId}/race/{raceId}/driver/{driverId}")
    public ResponseEntity<TipDTO> createTip(@PathVariable Long userId, @PathVariable Long raceId, @PathVariable Long driverId, @RequestBody TipDTO tipDTO) {
        TipDTO createdTip = tipService.createTip(tipDTO, userId, raceId, driverId);
        return ResponseEntity.ok(createdTip);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TipDTO>> getTipsByUser(@PathVariable Long userId) {
        List<TipDTO> tips = tipService.getTipsByUserId(userId);
        return ResponseEntity.ok(tips);
    }
}
