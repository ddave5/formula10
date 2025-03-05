package hu.project.formula10.repository;

import hu.project.formula10.model.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    List<News> findTop10ByOrderByPublishedAtDesc();

    void deleteNewsByPublishedAtBefore(LocalDateTime twoWeeksAgo);

    Page<News> findAllByOrderByPublishedAtAsc(Pageable pageable);
}
