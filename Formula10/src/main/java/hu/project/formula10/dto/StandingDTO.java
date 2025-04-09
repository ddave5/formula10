package hu.project.formula10.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StandingDTO {
    private Long groupId;
    private Long seasonId;
    private Integer seasonYear;
    private Long userId;
    private String username;
    private Integer totalPoints;
}
