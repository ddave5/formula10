package hu.project.formula10.service;

import hu.project.formula10.bot.NewsScraper;
import hu.project.formula10.dto.NewsDTO;
import hu.project.formula10.model.News;
import hu.project.formula10.repository.NewsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
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

    public Page<NewsDTO> getAllNews(int page, int size) {
        log.info("Fetching news for page: {}, size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.by("publishedAt").ascending());
        return newsRepository.findAllByOrderByPublishedAtAsc(pageable)
                .map(News::toDTO);
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
