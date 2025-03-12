package hu.project.formula10.controller;

import hu.project.formula10.dto.NewsDTO;
import hu.project.formula10.service.NewsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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

    @GetMapping
    public ResponseEntity<Page<NewsDTO>> getAllNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size
    ) {
        log.info("Fetching page {} with size {}", page, size);
        Page<NewsDTO> newsPage = newsService.getAllNews(page, size);
        return ResponseEntity.ok(newsPage);
    }


    @PostMapping
    public ResponseEntity<NewsDTO> createNews(@RequestBody NewsDTO newsDTO) {
        log.info("Entering method: createNews with news title: {}", newsDTO.getTitle());
        return ResponseEntity.ok(newsService.createNews(newsDTO));
    }
}
