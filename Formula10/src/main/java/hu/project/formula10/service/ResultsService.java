package hu.project.formula10.service;

import hu.project.formula10.dto.ResultsDTO;
import hu.project.formula10.model.Driver;
import hu.project.formula10.model.Race;
import hu.project.formula10.model.Results;
import hu.project.formula10.repository.DriverRepository;
import hu.project.formula10.repository.RaceRepository;
import hu.project.formula10.repository.ResultsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ResultsService {
    private final ResultsRepository resultsRepository;
    private final RaceRepository raceRepository;
    private final DriverRepository driverRepository;

    @Autowired
    public ResultsService(ResultsRepository resultsRepository, RaceRepository raceRepository, DriverRepository driverRepository) {
        this.resultsRepository = resultsRepository;
        this.raceRepository = raceRepository;
        this.driverRepository = driverRepository;
    }

    // Új eredmény hozzáadása
    public ResultsDTO addResult(ResultsDTO resultsDTO) {
        log.info("Fetching race with id: {}", resultsDTO.getRaceId());
        Race race = raceRepository.findById(resultsDTO.getRaceId()).orElseThrow(() -> new RuntimeException("Race not found"));
        log.info("Fetching driver with id: {}", resultsDTO.getDriverId());
        Driver driver = driverRepository.findById(resultsDTO.getDriverId()).orElseThrow(() -> new RuntimeException("Driver not found"));

        log.info("Create result");
        Results result = new Results();
        result.setRace(race);
        result.setDriver(driver);
        result.setPosition(resultsDTO.getPosition());

        resultsRepository.save(result);

        return new ResultsDTO(result.getId(), result.getRace().getId(), result.getDriver().getId(), result.getPosition());
    }

    // Eredmények lekérdezése egy adott futamhoz
    public List<ResultsDTO> getResultsByRace(Long raceId) {
        log.info("Fetching race with id: {}", raceId);
        Race race = raceRepository.findById(raceId).orElseThrow(() -> new RuntimeException("Race not found"));
        List<Results> results = resultsRepository.findByRace(race);

        log.info("Fetching results");
        return results.stream().map(result -> new ResultsDTO(
                        result.getId(), result.getRace().getId(), result.getDriver().getId(), result.getPosition()))
                .collect(Collectors.toList());
    }
}
