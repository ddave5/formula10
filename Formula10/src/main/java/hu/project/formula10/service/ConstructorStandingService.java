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

    public ConstructorStandingService(ConstructorStandingRepository constructorStandingRepository, StandingScraper standingScraper
    ) {
        this.constructorStandingRepository = constructorStandingRepository;
        this.standingScraper = standingScraper;
    }
    
    public List<ConstructorStandingDTO> getConstructorStanding(Integer year) {
        List<ConstructorStanding> constructorStandings = 
        constructorStandingRepository.findAllBySeasonYear(year).orElseThrow(
            () -> new RuntimeException("ConstructorStandings not found")
        );

        List<ConstructorStandingDTO> constructorStandingsDTO = new ArrayList<>();
        
        constructorStandings.forEach(constructorStanding -> constructorStandingsDTO.add(constructorStanding.toDTO(constructorStandings.indexOf(constructorStanding) + 1)));

        return constructorStandingsDTO;
    }

    public void updateConstructorStanding( Integer year) throws IOException {

        List<ConstructorStandingDTO> constructorStandingsDTO = standingScraper.getConstructorStandings(year);
        List<ConstructorStanding> constructorStandingsDB = constructorStandingRepository.findAllBySeasonYear(year).orElseThrow(() -> new RuntimeException("ConstructorStandings not found"));

        constructorStandingsDTO.forEach(constructorStandingDTO -> {
            ConstructorStanding constructorStanding = constructorStandingsDB
                                            .stream()
                                            .filter(d -> d
                                                .getConstructor()
                                                .getName()
                                                .contains(constructorStandingDTO.getConstructorName())
                                            )
                                            .findFirst()
                                            .orElseThrow(() -> new RuntimeException("ConstructorStanding not found"));
            constructorStanding.setPoint(constructorStandingDTO.getPoint());
            constructorStandingRepository.save(constructorStanding);
        });

        
    }
}
