package hu.project.formula10.bot;

import hu.project.formula10.service.NewsService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@EnableScheduling
public class ScheduledTask {

    private final NewsService newsService;


    public ScheduledTask(NewsService newsService) {
        this.newsService = newsService;
    }

    @Scheduled(fixedRate = 3600000) // Minden órában fut
    public void checkForNewNews() throws IOException {
        newsService.checkForNewNews();
    }
}
