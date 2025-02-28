package hu.project.formula10.model;

import hu.project.formula10.dto.RaceDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

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
    private LocalDateTime qualifyingStart;

    @Column(name="race_finish")
    private LocalDateTime raceFinish;

    public RaceDTO toDTO() {
        return new RaceDTO(
                this.getId(),
                this.getLocation(),
                this.getSeason().getId(),
                this.getQualifyingStart(),
                this.getRaceFinish()
        );
    }

}
