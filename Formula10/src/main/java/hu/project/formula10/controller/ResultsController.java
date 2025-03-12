package hu.project.formula10.controller;

import hu.project.formula10.dto.ResultsDTO;
import hu.project.formula10.service.ResultsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultsController {

    private final ResultsService resultsService;

    public ResultsController(ResultsService resultsService) {
        this.resultsService = resultsService;
    }

    @PostMapping("/add")
    public ResponseEntity<ResultsDTO> addResult(@RequestBody ResultsDTO resultsDTO) {
        ResultsDTO createdResult = resultsService.addResult(resultsDTO);
        return ResponseEntity.ok(createdResult);
    }


    @GetMapping("/race/{raceId}")
    public ResponseEntity<List<ResultsDTO>> getResultsByRace(@PathVariable Long raceId) {
        List<ResultsDTO> results = resultsService.getResultsByRace(raceId);
        return ResponseEntity.ok(results);
    }
}
