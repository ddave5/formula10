package hu.project.formula10.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import hu.project.formula10.bot.StandingScraper;
import hu.project.formula10.dto.DriverStandingDTO;
import hu.project.formula10.model.DriverStanding;
import hu.project.formula10.repository.DriverStandingRepository;


@Service
public class DriverStandingService {

    private final DriverStandingRepository driverStandingRepository;
    private final StandingScraper standingScraper;

    public DriverStandingService(DriverStandingRepository driverStandingRepository, StandingScraper standingScraper) {
        this.driverStandingRepository = driverStandingRepository;
        this.standingScraper = standingScraper;
    }
    
    public List<DriverStandingDTO> getDriverStandings(Integer year) {
        List<DriverStanding> driverStandings = 
        driverStandingRepository.findAllBySeasonYear(year).orElseThrow(
            () -> new RuntimeException("DriverStandings not found")
        );

        List<DriverStandingDTO> driverStandingsDTO = new ArrayList<>();
        
        driverStandings.forEach(driverStanding -> driverStandingsDTO.add(driverStanding.toDTO(driverStandings.indexOf(driverStanding) + 1)));

        return driverStandingsDTO;
    }

    public void updateDriverStanding(Integer year) throws IOException {

        List<DriverStandingDTO> driverStandingsDTO = standingScraper.getDriverStandings(year);
        List<DriverStanding> driverStandingsDB = driverStandingRepository.findAllBySeasonYear(year).orElseThrow(() -> new RuntimeException("DriverStandings not found"));

        driverStandingsDTO.forEach(driverStandingDTO -> {
            DriverStanding driverStanding = driverStandingsDB
                                            .stream()
                                            .filter(d -> d
                                                .getDriver()
                                                .getName()
                                                .contains(driverStandingDTO.getDriverName())
                                            )
                                            .findFirst()
                                            .orElseThrow(() -> new RuntimeException("DriverStanding not found with driver:" + driverStandingDTO.getDriverName()));
            driverStanding.setPoint(driverStandingDTO.getPoint());
            driverStandingRepository.save(driverStanding);
        });
    }
}
