package hu.project.formula10.model;

import hu.project.formula10.dto.ResultsDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Results {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "results_seq")
    @SequenceGenerator(name = "results_seq", sequenceName = "results_sequence", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "race_id", nullable = false)
    private Race race;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private Driver driver;

    @Column(nullable = false)
    private Integer position;  // Pilóta helyezése az adott futamon

    public ResultsDTO toDTO() {
        return new ResultsDTO(this.getId(), this.race.getId(), this.driver.getId(), this.position);
    }
}
