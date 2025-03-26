package hu.project.formula10.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import hu.project.formula10.bot.StandingScraper;
import hu.project.formula10.dto.ConstructorStandingDTO;
import hu.project.formula10.model.ConstructorStanding;
import hu.project.formula10.repository.ConstructorStandingRepository;

@Service
public class ConstructorStandingService {
    private final ConstructorStandingRepository constructorStandingRepository;
    private final StandingScraper standingScraper;

    public ConstructorStandingService(ConstructorStandingRepository constructorStandingRepository, StandingScraper standingScraper) {
        this.constructorStandingRepository = constructorStandingRepository;
        this.standingScraper = standingScraper;
    }
    
    public List<ConstructorStandingDTO> getConstructorStanding(Long seasonId) {
        List<ConstructorStanding> constructorStandings = 
        constructorStandingRepository.findAllBySeasonYear(seasonId).orElseThrow(
            () -> new RuntimeException("ConstructorStandings not found")
        );

        List<ConstructorStandingDTO> constructorStandingsDTO = new ArrayList<>();
        
        constructorStandings.forEach(constructorStanding -> constructorStandingsDTO.add(constructorStanding.toDTO(constructorStandings.indexOf(constructorStanding) + 1)));

        return constructorStandingsDTO;
    }

    public void updateConstructorStanding() throws IOException {

        List<ConstructorStandingDTO> constructorStandingsDTO = standingScraper.getConstructorStandings();

        constructorStandingsDTO.forEach(constructorStandingDTO -> {
            ConstructorStanding standing = constructorStandingRepository.findByConstructorName(constructorStandingDTO.getConstructorName()).orElseThrow(() -> new RuntimeException("ConstructorStanding not found"));
            standing.setPoint(constructorStandingDTO.getPoint());
            constructorStandingRepository.save(standing);
        });

        
    }
}
