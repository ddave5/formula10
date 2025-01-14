package hu.project.formula10.model;

import hu.project.formula10.dto.NewsDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "news")
@Getter
@Setter
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long newsId;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 255)
    private String sourceUrl;

    @Column(nullable = false, length = 255)
    private String imageUrl;

    @Column(nullable = false)
    private LocalDateTime publishedAt;

    public News(String title, String sourceUrl, String imageUrl, LocalDateTime publishedAt) {
        this.title = title;
        this.sourceUrl = sourceUrl;
        this.imageUrl = imageUrl;
        this.publishedAt = publishedAt;
    }

    public NewsDTO toDTO() {
        return new NewsDTO(this.getNewsId(), this.getTitle(), this.getSourceUrl(), this.getImageUrl(), this.getPublishedAt());
    }

    public News() { }
}
