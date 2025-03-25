package hu.project.formula10.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.project.formula10.dto.ConstructorStandingDTO;
import hu.project.formula10.dto.DriverStandingDTO;
import hu.project.formula10.service.ConstructorStandingService;
import hu.project.formula10.service.DriverStandingService;

@RestController
@RequestMapping("/api/standings")
public class StandingController {
    
    private final DriverStandingService driverStandingService;
    private final ConstructorStandingService constructorStandingService;

    public StandingController(DriverStandingService driverStandingService, ConstructorStandingService constructorStandingService) {
        this.driverStandingService = driverStandingService;
        this.constructorStandingService = constructorStandingService;
    }

    @GetMapping("/driverStanding/{seasonId}")
    public ResponseEntity<List<DriverStandingDTO>> getDriverStandingDTO(@PathVariable Long seasonId) {
        return ResponseEntity.ok().body(driverStandingService.getDriverStandings(seasonId));
    }

    @GetMapping("/constructorStanding/{seasonId}")
    public ResponseEntity<List<ConstructorStandingDTO>> getConstructorStandingDTO(@PathVariable Long seasonId) {
        return ResponseEntity.ok().body(constructorStandingService.getConstructorStanding(seasonId));
    }
}
