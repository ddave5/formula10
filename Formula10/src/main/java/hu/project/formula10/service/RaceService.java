package hu.project.formula10.service;

import hu.project.formula10.dto.RaceDTO;
import hu.project.formula10.model.Race;
import hu.project.formula10.repository.RaceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@Slf4j
public class RaceService {

    private RaceRepository raceRepository;

    public RaceService( RaceRepository raceRepository) {
        this.raceRepository = raceRepository;
    }

    public Optional<RaceDTO> getNextRace() {
        log.info("Fetching next race");
        Optional<Race> nextRace = raceRepository.findNextRace();
        return nextRace.map(Race::toDTO);
    }

    public Optional<Race> getPreviousRace() {
        log.info("Fetching previous race");
        Optional<Race> nextRace = raceRepository.findPreviousRace();
        return nextRace;
    }
}
