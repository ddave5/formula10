package hu.project.formula10.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Getter
@Setter
public class NewsDTO {

    private Long newsId;
    private String title;
    private String sourceUrl;
    private String imageUrl;
    private LocalDateTime publishedAt;
    private String details;


    public NewsDTO(Long newsId, String title, String sourceUrl, String imageUrl, LocalDateTime publishedAt, String details) {
        this.newsId = newsId;
        this.title = title;
        this.sourceUrl = sourceUrl;
        this.imageUrl = imageUrl;
        this.publishedAt = publishedAt;
        this.details = details;
    }
}
