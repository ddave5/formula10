package hu.project.formula10.bot;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import hu.project.formula10.dto.ConstructorStandingDTO;
import hu.project.formula10.dto.DriverStandingDTO;

@Component
public class StandingScraper {

    private static String BASE_URL(Integer year, String category) {
        return "https://www.formula1.com/en/results/" + year + "/" + category;
    }

    public List<DriverStandingDTO> getDriverStandings(Integer year) throws IOException {
        List<DriverStandingDTO> driverStandingDTOs = new ArrayList<>();
        
        List<Element> driverStandingList = getTable("drivers", year);
  
        int i = 1;
        for (Element driverStanding : driverStandingList) {
            DriverStandingDTO driverStandingDTO = new DriverStandingDTO();
            driverStandingDTO.setDriverName(
                driverStanding.select("td").get(1).select("span").get(0).text() + " " +
                driverStanding.select("td").get(1).select("span").get(1).text());
            driverStandingDTO.setPosition(i++);
            driverStandingDTO.setPoint(Integer.parseInt(driverStanding.select("td").get(4).text()));
            driverStandingDTOs.add(driverStandingDTO);
        }        

        return driverStandingDTOs;
    }

    public List<ConstructorStandingDTO> getConstructorStandings(Integer year) throws IOException {

        List<ConstructorStandingDTO> constructorStandingDTOs = new ArrayList<>();

        List<Element> constructorStandingList = getTable("team", year);

        int i = 1;
        for (Element constructorStanding : constructorStandingList) {
            ConstructorStandingDTO constructorStandingDTO = new ConstructorStandingDTO();
            constructorStandingDTO.setConstructorName(constructorStanding.select("td").get(1).text());
            constructorStandingDTO.setPosition(i++);
            constructorStandingDTO.setPoint(Integer.parseInt(constructorStanding.select("td").get(2).text()));
            constructorStandingDTOs.add(constructorStandingDTO);
        }        

        return constructorStandingDTOs;
    }

    private List<Element> getTable(String category, Integer year) throws IOException {
        Document doc = Jsoup.connect(BASE_URL(year, category)).get();

        List<Element> standingList = 
                doc
                .select("table")
                .first()
                .select("tbody")
                .first()
                .select("tr");   

        return standingList;
    }
}
