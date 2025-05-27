package hu.project.formula10.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DriverDTO {

    private Long id;
    private String name;
    private Long constructorId;
    private String constructorName;
    private Integer raceNumber;
    private boolean isActive;
}
