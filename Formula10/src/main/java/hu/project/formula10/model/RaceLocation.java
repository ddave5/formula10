package hu.project.formula10.model;

import hu.project.formula10.dto.RaceLocationDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table( name = "raceLocation")
public class RaceLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "locationname", unique = true)
    private String locationName;

    public RaceLocationDTO toDTO() {
        return new RaceLocationDTO(this.getId(), this.getLocationName());
    }

}
