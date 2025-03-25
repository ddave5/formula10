package hu.project.formula10.bot;

import hu.project.formula10.dto.RaceDTO;
import hu.project.formula10.service.ConstructorStandingService;
import hu.project.formula10.service.DriverStandingService;
import hu.project.formula10.service.NewsService;
import hu.project.formula10.service.RaceService;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.ZonedDateTime;

@Service
@EnableScheduling
public class ScheduledTask {

    private final NewsService newsService;
    private final DriverStandingService driverStandingService;
    private final ConstructorStandingService constructorStandingService;
    private final RaceService raceService;


    public ScheduledTask(
        NewsService newsService, 
        DriverStandingService driverStandingService, 
        ConstructorStandingService constructorStandingService,
        RaceService raceService
    ) {
        this.newsService = newsService;
        this.driverStandingService = driverStandingService;
        this.constructorStandingService = constructorStandingService;
        this.raceService = raceService;
    }

    @Scheduled(fixedRate = 3600000) // Minden órában fut 
    public void checkForNewNews() throws IOException {
        newsService.checkForNewNews();
    }

    @Scheduled(cron = "0 8 * * * *", zone = "Europe/Budapest")
    public void updateStandings() throws IOException {

        RaceDTO prevRace = raceService.getPreviousRace().orElse(null);

        if (prevRace != null) {
            int nextDay = prevRace.getRaceStart().plusDays(1).getDayOfYear();
            if (nextDay == ZonedDateTime.now().getDayOfYear()) {
                driverStandingService.updateDriverStanding();
                constructorStandingService.updateConstructorStanding();
            }
        }
        
    }
}
