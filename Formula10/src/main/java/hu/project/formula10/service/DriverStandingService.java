package hu.project.formula10.service;

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
    
    public List<DriverStandingDTO> getDriverStandings(Long seasonId) {
        List<DriverStanding> driverStandings = 
        driverStandingRepository.findAllBySeasonId(seasonId).orElseThrow(
            () -> new RuntimeException("DriverStandings not found")
        );

        driverStandings.sort((o1, o2) -> o1.getPoint() - o2.getPoint());

        List<DriverStandingDTO> driverStandingsDTO = new ArrayList<>();
        
        driverStandings.forEach(driverStanding -> driverStandingsDTO.add(driverStanding.toDTO(driverStandings.indexOf(driverStanding) + 1)));

        return driverStandingsDTO;
    }

    public void updateDriverStanding() {

        List<DriverStandingDTO> driverStandingsDTO = standingScraper.getDriverStandings();

        driverStandingsDTO.forEach(driverStandingDTO -> {
            DriverStanding driverStanding = driverStandingRepository.findByDriverName(driverStandingDTO.getDriverName()).orElseThrow(() -> new RuntimeException("DriverStanding not found"));
            driverStanding.setPoint(driverStandingDTO.getPoint());
            driverStandingRepository.save(driverStanding);
        });
    }
}
