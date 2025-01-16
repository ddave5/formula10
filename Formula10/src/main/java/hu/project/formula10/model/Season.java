package hu.project.formula10.model;

import hu.project.formula10.dto.SeasonDTO;
import hu.project.formula10.enums.SeasonStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "season")
@Getter
@Setter
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "year")
    private int year;

    @ManyToMany
    @JoinTable(
            name = "season_driver", // Join table name
            joinColumns = @JoinColumn(name = "seasonId"), // Foreign key for season
            inverseJoinColumns = @JoinColumn(name = "driverId") // Foreign key for driver
    )
    private Set<Driver> drivers = new HashSet<>();

    public SeasonDTO toDTO() {
        return new SeasonDTO(this.getId(), this.getYear());
    }
}
