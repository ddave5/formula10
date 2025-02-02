package hu.project.formula10.service;

import hu.project.formula10.dto.ResultsDTO;
import hu.project.formula10.model.Driver;
import hu.project.formula10.model.Race;
import hu.project.formula10.model.Results;
import hu.project.formula10.repository.DriverRepository;
import hu.project.formula10.repository.RaceRepository;
import hu.project.formula10.repository.ResultsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
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
        Race race = raceRepository.findById(resultsDTO.getRaceId()).orElseThrow(() -> new RuntimeException("Race not found"));
        Driver driver = driverRepository.findById(resultsDTO.getDriverId()).orElseThrow(() -> new RuntimeException("Driver not found"));

        Results result = new Results();
        result.setRace(race);
        result.setDriver(driver);
        result.setPosition(resultsDTO.getPosition());

        resultsRepository.save(result);

        return new ResultsDTO(result.getId(), result.getRace().getId(), result.getDriver().getId(), result.getPosition());
    }

    // Eredmények lekérdezése egy adott futamhoz
    public List<ResultsDTO> getResultsByRace(Long raceId) {
        Race race = raceRepository.findById(raceId).orElseThrow(() -> new RuntimeException("Race not found"));
        List<Results> results = resultsRepository.findByRace(race);

        return results.stream().map(result -> new ResultsDTO(
                        result.getId(), result.getRace().getId(), result.getDriver().getId(), result.getPosition()))
                .collect(Collectors.toList());
    }

    // Eredmények lekérdezése egy adott pilótához
    public List<ResultsDTO> getResultsByDriver(Long driverId) {
        Driver driver = driverRepository.findById(driverId).orElseThrow(() -> new RuntimeException("Driver not found"));
        List<Results> results = resultsRepository.findByDriver(driver);

        return results.stream().map(result -> new ResultsDTO(
                        result.getId(), result.getRace().getId(), result.getDriver().getId(), result.getPosition()))
                .collect(Collectors.toList());
    }
}
