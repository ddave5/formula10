package hu.project.formula10.model;

import hu.project.formula10.dto.GroupDTO;
import hu.project.formula10.dto.SeasonDTO;
import hu.project.formula10.enums.SeasonStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Entity
@Table(name = "season")
@Getter
@Setter
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private SeasonStatus status;

    public SeasonDTO toDTO() {
        SeasonDTO seasonDTO = new SeasonDTO();
        seasonDTO.setId(this.id);
        seasonDTO.setStartDate(this.startDate);
        seasonDTO.setEndDate(this.endDate);
        return seasonDTO;
    }
}
