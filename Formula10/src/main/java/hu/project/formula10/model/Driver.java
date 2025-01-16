package hu.project.formula10.model;

import hu.project.formula10.dto.DriverDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table( name = "drivers")
@Getter
@Setter
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, name = "name")
    private String name;

    // Mapping for the many-to-many relationship with Season
    @ManyToMany(mappedBy = "drivers")
    private Set<Season> seasons = new HashSet<>();

    public DriverDTO toDTO() {
        return new DriverDTO(this.getId(), this.getName());
    }
}
