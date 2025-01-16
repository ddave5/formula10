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

    @ManyToOne
    @JoinColumn(name = "raceLocationId", referencedColumnName = "id")
    private RaceLocation location;

    @ManyToOne
    @JoinColumn(name = "seasonId", referencedColumnName = "id")
    private Season season;

    @Column(name="qualifyingStart")
    private LocalDateTime qualifyingStart;

    @Column(name="raceFinish")
    private LocalDateTime raceFinish;

    public RaceDTO toDTO() {
        return new RaceDTO(
                this.getId(),
                this.getLocation().getId(),
                this.getSeason().getId(),
                this.getQualifyingStart(),
                this.getRaceFinish()
        );
    }

}
