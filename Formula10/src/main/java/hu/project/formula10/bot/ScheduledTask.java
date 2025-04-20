package hu.project.formula10.bot;

import hu.project.formula10.model.Race;
import hu.project.formula10.service.ConstructorStandingService;
import hu.project.formula10.service.DriverStandingService;
import hu.project.formula10.service.NewsService;
import hu.project.formula10.service.RaceService;
import hu.project.formula10.service.ScoreService;

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
    private final ScoreService scoreService;


    public ScheduledTask(
        NewsService newsService, 
        DriverStandingService driverStandingService, 
        ConstructorStandingService constructorStandingService,
        RaceService raceService,
        ScoreService scoreService
    ) {
        this.newsService = newsService;
        this.driverStandingService = driverStandingService;
        this.constructorStandingService = constructorStandingService;
        this.raceService = raceService;
        this.scoreService = scoreService;
    }

    @Scheduled(fixedRate = 3600000) // Minden órában fut 
    public void checkForHungarianNewNews() throws IOException {
        newsService.checkForHungarianNewNews();
    }

    @Scheduled(fixedRate = 3600000) // Minden órában fut 
    public void checkForEnglishNewNews() throws IOException {
        newsService.checkForEnglishNewNews();
    }

    @Scheduled(cron = "0 0 8 * * 1", zone = "Europe/Budapest")
    public void updateStandings() throws IOException {

        Race prevRace = raceService.getPreviousRace().orElse(null);

        if (prevRace != null) {
            int nextDay = prevRace.getRaceStart().plusDays(1).getDayOfYear();
            if (nextDay == ZonedDateTime.now().getDayOfYear()) {
                driverStandingService.updateDriverStanding(prevRace.getSeason().getYear());
                constructorStandingService.updateConstructorStanding(prevRace.getSeason().getYear());
            }
        }
        
    }

    @Scheduled(cron = "0 0 4 * * 1", zone = "Europe/Budapest")
    public void calculatePoints() throws IOException {

        Race prevRace = raceService.getPreviousRace().orElse(null);

        if (prevRace != null) {
            int nextDay = prevRace.getRaceStart().plusDays(1).getDayOfYear();
            if (nextDay == ZonedDateTime.now().getDayOfYear()) {
                scoreService.calculatePoints(prevRace);
            }
        }
        
    }
}
