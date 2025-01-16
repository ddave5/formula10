package hu.project.formula10.dto;

import hu.project.formula10.model.RaceLocation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RaceDTO {

    private Long id;
    private Long locationId;
    private Long seasonId;
    private LocalDateTime qualifyingStart;
    private LocalDateTime raceFinish;
}
