package hu.project.formula10.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.project.formula10.dto.ConstructorStandingDTO;
import hu.project.formula10.dto.DriverStandingDTO;
import hu.project.formula10.dto.StandingDTO;
import hu.project.formula10.service.ConstructorStandingService;
import hu.project.formula10.service.DriverStandingService;
import hu.project.formula10.service.StandingService;

@RestController
@RequestMapping("/api/standings")
public class StandingController {
    
    private final DriverStandingService driverStandingService;
    private final ConstructorStandingService constructorStandingService;
    private final StandingService standingService;

    public StandingController(DriverStandingService driverStandingService, ConstructorStandingService constructorStandingService, StandingService standingService) {
        this.driverStandingService = driverStandingService;
        this.constructorStandingService = constructorStandingService;
        this.standingService = standingService;
    }

    @GetMapping("/driverStanding/{year}")
    public ResponseEntity<List<DriverStandingDTO>> getDriverStandingDTO(@PathVariable Integer year) {
        return ResponseEntity.ok().body(driverStandingService.getDriverStandings(year));
    }

    @GetMapping("/constructorStanding/{year}")
    public ResponseEntity<List<ConstructorStandingDTO>> getConstructorStandingDTO(@PathVariable Integer year) {
        return ResponseEntity.ok().body(constructorStandingService.getConstructorStanding(year));
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<List<StandingDTO>> getGroupStanding(
            @PathVariable Long groupId
            ) {
        List<StandingDTO> standings = standingService.getStandingByGroupAndSeason(groupId);
        return ResponseEntity.ok(standings);
    }
}
