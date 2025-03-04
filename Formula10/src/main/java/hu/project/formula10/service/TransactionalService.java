package hu.project.formula10.service;

import hu.project.formula10.repository.NewsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class TransactionalService {

    private final NewsRepository newsRepository;

    public TransactionalService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @Transactional
    public void deleteOldNewsTransactional() {
        newsRepository.deleteNewsByPublishedAtBefore(LocalDateTime.now().minusWeeks(2));
    }
}
