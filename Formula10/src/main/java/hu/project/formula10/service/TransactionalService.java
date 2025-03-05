package hu.project.formula10.service;

import hu.project.formula10.repository.NewsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Slf4j
public class TransactionalService {

    private final NewsRepository newsRepository;

    public TransactionalService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @Transactional
    public void deleteOldNewsTransactional() {
        LocalDateTime deadline = LocalDateTime.now().minusWeeks(2);
        log.info("Delete news which published before: {}", deadline);
        newsRepository.deleteNewsByPublishedAtBefore(deadline);
    }
}
