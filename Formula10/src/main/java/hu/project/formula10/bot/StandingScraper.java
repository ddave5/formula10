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
    
    private static final String BASE_URL = "https://www.nemzetisport.hu/f1/2025/01/f1-2025-adatbank";
    public List<DriverStandingDTO> getDriverStandings() throws IOException {
        List<DriverStandingDTO> driverStandingDTOs = new ArrayList<>();
        
        List<Element> driverStandingList = getTable(true);

        driverStandingList.remove(0);
        
        int i = 1;
        for (Element driverStanding : driverStandingList) {
            DriverStandingDTO driverStandingDTO = new DriverStandingDTO();
            driverStandingDTO.setDriverName(driverStanding.select("td").get(1).text());
            driverStandingDTO.setPosition(i++);
            driverStandingDTO.setPoint(Integer.parseInt(driverStanding.select("td").get(5).text()));
            driverStandingDTOs.add(driverStandingDTO);
        }        

        return driverStandingDTOs;
    }

    public List<ConstructorStandingDTO> getConstructorStandings() throws IOException {

        List<ConstructorStandingDTO> constructorStandingDTOs = new ArrayList<>();

        List<Element> constructorStandingList = getTable(false);

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

    private List<Element> getTable(boolean isDriver) throws IOException {
        Document doc = Jsoup.connect(BASE_URL).get();
        Element table = null;
        if (isDriver) {
            table = doc
                .select("div.table-wrapper")
                .first();
        } else {
            table = doc
                .select("div.table-wrapper")
                .get(1);
        }

        List<Element> standingList = 
                table
                .select("tbody")
                .first()
                .select("tr");
            
        standingList.remove(0);        

        return standingList;
    }
}
