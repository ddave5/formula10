package hu.project.formula10.bot;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import hu.project.formula10.model.Race;

@Component
public class RaceResultScraper {
    private static final String BASE_URL = "https://www.formula1.com/en/results/";

    public Map<Integer, Integer> getResult(Race race) throws IOException {
        Map<Integer, Integer> results = new HashMap<>();

        int year = race.getSeason().getYear();
        String location = race.getLocation();
        int allTimeNumber = race.getAllTimeNumber();
        String url = BASE_URL + year + "/races/" + allTimeNumber + "/" + location + "/race-result";

        Document doc = Jsoup.connect(url).get();

        List<Element> rows = doc.getElementsByClass("f1-table").select("tbody").select("tr");

        int index = 1;
        for (Element row : rows) {
            results.put(Integer.parseInt(row.select("td").get(1).text()), index++);
        }

        return results;
    }
}
