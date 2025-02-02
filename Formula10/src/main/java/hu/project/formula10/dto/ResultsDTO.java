package hu.project.formula10.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResultsDTO {
    private Long id;
    private Long raceId;
    private Long driverId;
    private Integer position;  // Pilóta helyezése
}