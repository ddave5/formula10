package hu.project.formula10.bot;

import hu.project.formula10.dto.NewsDTO;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class NewsScraper {
    private static final String BASE_URL = "https://www.nemzetisport.hu/";
    private static final String NEWS_URL = BASE_URL + "rovat/f1";


    public List<NewsDTO> scrapeNews() throws IOException {
        List<NewsDTO> newsList = new ArrayList<>();
        Document doc = Jsoup.connect(NEWS_URL).get();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd. HH:mm");

        // A hírek címének és URL-jének keresése
        List<String> newsLinks = doc
                .select("nso-article-card")
                .subList(0,11)
                .stream()
                .map( element -> element.select("a").attr("href"))
                .filter(link -> !link.contains("adatbank"))
                .toList();

        for (String link : newsLinks) {
            Document subdoc = Jsoup.connect(BASE_URL + link).get();
            NewsDTO newsDTO = new NewsDTO();
            newsDTO.setTitle(subdoc.select("h1").text());
            newsDTO.setPublishedAt(LocalDateTime.parse(subdoc.getElementsByClass("article-header-date").getFirst().text(), formatter));
            newsDTO.setSourceUrl(BASE_URL + link);
            newsDTO.setDetails(subdoc.getElementsByClass("lead").getFirst().text());
            newsDTO.setImageUrl(subdoc.getElementsByClass("article-page-thumbnail").getFirst().attr("src"));
            newsList.add(newsDTO);
        }

        return newsList;
    }
}
