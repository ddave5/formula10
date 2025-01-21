package hu.project.formula10.model;

import hu.project.formula10.dto.TipDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "tip")
@NoArgsConstructor
@AllArgsConstructor
public class Tip {
    @Id
    @SequenceGenerator(name = "tip_seq", sequenceName = "tip_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tip_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "raceid", referencedColumnName = "id")
    private Race race;

    @ManyToOne
    @JoinColumn(name = "driverid", referencedColumnName = "id")
    private Driver predictedTenthPlaceDriver;

    @ManyToOne
    @JoinColumn(name = "groupid", referencedColumnName = "id")
    private Group group;

    @ManyToOne
    @JoinColumn(name = "seasonid", referencedColumnName = "id")
    private Season season;

    @Column(name = "tipdate")
    private LocalDateTime createdAt;

    public TipDTO toDTO() {
        return  new TipDTO(
                this.getId(),
                this.getUser().getId(),
                this.group.getId(),
                this.season.getId(),
                this.race.getId(),
                this.predictedTenthPlaceDriver.getId()
        );
    }
}
