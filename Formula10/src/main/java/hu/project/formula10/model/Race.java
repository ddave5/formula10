package hu.project.formula10.model;

import hu.project.formula10.dto.RaceDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;

@Entity
@Getter
@Setter
@Table(name = "race")
public class Race {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "race_location")
    private String location;

    @ManyToOne
    @JoinColumn(name = "season_id", referencedColumnName = "id")
    private Season season;

    @Column(name="qualifying_start")
    private ZonedDateTime qualifyingStart;

    @Column(name="race_start")
    private ZonedDateTime raceStart;

    @Column(name="sprint_qualifying_start")
    private ZonedDateTime sprintQualifyingStart;

    @Column(name="sprint_race_start")
    private ZonedDateTime sprintRaceStart;

    @Column(name="all_time_number")
    private Integer allTimeNumber;

    public RaceDTO toDTO() {
        return new RaceDTO(
                this.getId(),
                this.getLocation(),
                this.getSeason().getId(),
                this.getSeason().getYear(),
                this.getQualifyingStart(),
                this.getRaceStart(),
                this.getSprintQualifyingStart(),
                this.getSprintRaceStart(),
                this.getAllTimeNumber()
        );
    }

}
