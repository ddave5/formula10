package hu.project.formula10.service;

import hu.project.formula10.bot.NewsScraper;
import hu.project.formula10.dto.NewsDTO;
import hu.project.formula10.model.News;
import hu.project.formula10.repository.NewsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@Slf4j
public class NewsService {

    private final NewsRepository newsRepository;
    private final NewsScraper newsScraper;
    private final TransactionalService transactionalService;

    @Autowired
    public NewsService(NewsRepository newsRepository, NewsScraper newsScraper, TransactionalService transactionalService) {
        this.newsRepository = newsRepository;
        this.newsScraper = newsScraper;
        this.transactionalService = transactionalService;
    }

    public List<NewsDTO> getAllNews() {
        log.info("Entering method: getAllNews");
        return newsRepository.findAll().stream().map(News::toDTO).sorted(Comparator.comparing(NewsDTO::getPublishedAt).reversed()).toList();
    }

    public NewsDTO createNews(NewsDTO newsDTO) {
        log.info("Entering method: createNews with news title: {}", newsDTO.getTitle());
        News news = new News();
        news.setTitle(newsDTO.getTitle());
        news.setImageUrl(newsDTO.getImageUrl());
        news.setSourceUrl(newsDTO.getSourceUrl());
        news.setPublishedAt(newsDTO.getPublishedAt());
        news.setDetails(newsDTO.getDetails());

        return newsRepository.save(news).toDTO();
    }

    public void checkForNewNews() throws IOException {
        List<NewsDTO> newNewsList = newsScraper.scrapeNews();
        List<News> existingNews = newsRepository.findTop10ByOrderByPublishedAtDesc();

        for (NewsDTO newsDTO : newNewsList) {
            boolean isDuplicate = existingNews.stream()
                    .anyMatch(existing -> existing.getSourceUrl().equals(newsDTO.getSourceUrl()));
            if (!isDuplicate) {
                createNews(newsDTO);
            }
        }

        transactionalService.deleteOldNewsTransactional();
    }
}
