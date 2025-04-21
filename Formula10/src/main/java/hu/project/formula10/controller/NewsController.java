package hu.project.formula10.controller;

import hu.project.formula10.dto.NewsDTO;
import hu.project.formula10.service.NewsService;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@Slf4j
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/hungarian")
    public ResponseEntity<List<NewsDTO>> getAllHungarianNews() {
        List<NewsDTO> newsPage = newsService.getAllHungarianNews();
        return ResponseEntity.ok(newsPage);
    }

    @GetMapping("/english")
    public ResponseEntity<List<NewsDTO>> getAllEnglishNews() {
        List<NewsDTO> newsPage = newsService.getAllEnglishNews();
        return ResponseEntity.ok(newsPage);
    }

    @PostMapping
    public ResponseEntity<NewsDTO> createNews(@RequestBody NewsDTO newsDTO) {
        log.info("Entering method: createNews with news title: {}", newsDTO.getTitle());
        return ResponseEntity.ok(newsService.createNews(newsDTO));
    }
}
