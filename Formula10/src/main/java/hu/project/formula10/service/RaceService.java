package hu.project.formula10.service;

import hu.project.formula10.dto.RaceDTO;
import hu.project.formula10.model.Race;
import hu.project.formula10.repository.RaceRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class RaceService {

    private RaceRepository raceRepository;

    public RaceService( RaceRepository raceRepository) {
        this.raceRepository = raceRepository;
    }

    public Optional<RaceDTO> getNextRace() {
        Optional<Race> nextRace = raceRepository.findNextRace();
        return nextRace.map(Race::toDTO);
    }
}
