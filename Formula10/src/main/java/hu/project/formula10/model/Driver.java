package hu.project.formula10.model;

import hu.project.formula10.dto.DriverDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table( name = "driver")
@Getter
@Setter
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "constructor_id", referencedColumnName = "id", nullable = false)
    private Constructor constructor;

    @Column(name = "race_number")
    private Integer raceNumber;

    public DriverDTO toDTO() {
        return new DriverDTO(this.getId(), this.getName(), this.getConstructor().getId(), this.getConstructor().getName(), this.getRaceNumber());
    }
}
