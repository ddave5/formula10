package hu.project.formula10.controller;

import hu.project.formula10.dto.StandingDTO;
import hu.project.formula10.service.StandingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/standings")
public class StandingController {

    private final StandingService standingService;

    public StandingController(StandingService standingService) {
        this.standingService = standingService;
    }

    @GetMapping("/byGroupAndSeason")
    public ResponseEntity<StandingDTO> getStandingByGroupAndSeason(
            @RequestParam("groupId") Long groupId,
            @RequestParam("seasonId") Long seasonId) {

        Optional<StandingDTO> standing = standingService.getStandingByGroupAndSeason(groupId, seasonId);

        return standing.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
