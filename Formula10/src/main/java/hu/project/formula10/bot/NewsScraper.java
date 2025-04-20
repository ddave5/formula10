package hu.project.formula10.bot;

import hu.project.formula10.dto.NewsDTO;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class NewsScraper {
    private static final String BASE_HUNGARIAN_URL = "https://www.nemzetisport.hu/";
    private static final String NEWS_HUNGARIAN_URL = BASE_HUNGARIAN_URL + "rovat/f1";

    private static final String BASE_ENGLISH_URL = "https://www.motorsport.com/f1/";
    private static final String NEWS_ENGLISH_URL = BASE_ENGLISH_URL + "news/";

    public List<NewsDTO> scrapHungarianNews() throws IOException {
        List<NewsDTO> newsList = new ArrayList<>();
        Document doc = Jsoup.connect(NEWS_HUNGARIAN_URL).get();
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
            Document subdoc = Jsoup.connect(BASE_HUNGARIAN_URL + link).get();
            NewsDTO newsDTO = new NewsDTO();
            newsDTO.setTitle(Objects.requireNonNull(subdoc.select("h1").first()).text());
            newsDTO.setPublishedAt(LocalDateTime.parse(subdoc.getElementsByClass("article-header-date").getFirst().text(), formatter));
            newsDTO.setSourceUrl(BASE_HUNGARIAN_URL + link);
            newsDTO.setDetails(subdoc.getElementsByClass("lead").getFirst().text());
            newsDTO.setImageUrl(subdoc.getElementsByClass("article-page-thumbnail").getFirst().attr("src"));
            newsList.add(newsDTO);
        }

        return newsList;
    }

    public List<NewsDTO> scrapEnglishNews() throws IOException {
        List<NewsDTO> newsList = new ArrayList<>();
        Document doc = Jsoup.connect(NEWS_ENGLISH_URL).get();

        // A hírek címének és URL-jének keresése
        List<String> newsLinks = doc
                .select("a")
                .subList(0,11)
                .stream()
                .map( element -> element.select("a").attr("href"))
                .toList();

        for (String link : newsLinks) {
            Document subdoc = Jsoup.connect(BASE_ENGLISH_URL + link).get();
            NewsDTO newsDTO = new NewsDTO();
            newsDTO.setTitle(Objects.requireNonNull(subdoc.select("h1").first()).text());
            newsDTO.setPublishedAt(convertDateFormat(subdoc.select("time").attr("datetime")));
            newsDTO.setSourceUrl(BASE_ENGLISH_URL + link);
            newsDTO.setDetails(subdoc.select("h2").getFirst().text());
            newsDTO.setImageUrl(subdoc.select("img").getFirst().attr("src"));
            newsList.add(newsDTO);
        }

        return newsList;
    }

    public static LocalDateTime convertDateFormat(String input) {
        Instant instant = Instant.parse(input);
        return LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
    }
}
