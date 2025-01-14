package hu.project.formula10.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SeasonDTO {

    private Long id;
    private String year;
    private LocalDate startDate;
    private LocalDate endDate;

}
