package hu.project.formula10.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RaceDTO {

    private Long id;
    private String location;
    private Long seasonId;
    private int seasonYear;
    private ZonedDateTime qualifyingStart;
    private ZonedDateTime raceStart;
    private ZonedDateTime sprintQualifyingStart;
    private ZonedDateTime sprintRaceStart;
}
