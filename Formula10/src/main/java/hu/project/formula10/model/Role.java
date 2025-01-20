package hu.project.formula10.model;

import hu.project.formula10.enums.RoleName;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RoleName name;

}
