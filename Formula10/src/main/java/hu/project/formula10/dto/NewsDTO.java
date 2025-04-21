package hu.project.formula10.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NewsDTO {

    private Long id;
    private String title;
    private String sourceUrl;
    private String imageUrl;
    private LocalDateTime publishedAt;
    private String details;
    private String language;

    public NewsDTO(Long id, String title, String sourceUrl, String imageUrl, LocalDateTime publishedAt, String details, String language) {
        this.id = id;
        this.title = title;
        this.sourceUrl = sourceUrl;
        this.imageUrl = imageUrl;
        this.publishedAt = publishedAt;
        this.details = details;
        this.language = language;
    }

    public NewsDTO() {}
}
