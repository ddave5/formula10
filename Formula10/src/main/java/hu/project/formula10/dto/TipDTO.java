package hu.project.formula10.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TipDTO {

    private Long id;
    private Long userId;
    private Long groupId;
    private Long seasonId;
    private Long raceId;
    private Long driverId;
}
