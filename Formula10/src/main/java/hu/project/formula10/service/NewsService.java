package hu.project.formula10.service;

import hu.project.formula10.dto.NewsDTO;
import hu.project.formula10.model.News;
import hu.project.formula10.repository.NewsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class NewsService {

    private final NewsRepository newsRepository;

    @Autowired
    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public List<NewsDTO> getAllNews() {
        log.info("Entering method: getAllNews");
        return newsRepository.findAll().stream().map(News::toDTO).toList();
    }

    public NewsDTO createNews(NewsDTO newsDTO) {
        log.info("Entering method: createNews with news title: {}", newsDTO.getTitle());
        News news = new News();
        news.setTitle(newsDTO.getTitle());
        news.setImageUrl(newsDTO.getImageUrl());
        news.setSourceUrl(newsDTO.getSourceUrl());
        news.setPublishedAt(LocalDateTime.now());
        news.setDetails(newsDTO.getDetails());

        return newsRepository.save(news).toDTO();
    }
}
