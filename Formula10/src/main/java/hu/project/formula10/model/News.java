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
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 255)
    private String sourceUrl;

    @Column(nullable = false, length = 255)
    private String imageUrl;

    @Column(nullable = false)
    private LocalDateTime publishedAt;

    @Column(name = "details", length = 1000)
    private String details;

    public NewsDTO toDTO() {
        return new NewsDTO(this.getId(), this.getTitle(), this.getSourceUrl(), this.getImageUrl(), this.getPublishedAt(), this.getDetails());
    }

    public News() { }
}
