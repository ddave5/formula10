package hu.project.formula10.model;

import hu.project.formula10.dto.TipDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tip")
public class Tip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public TipDTO toDTO() {
        TipDTO tipDTO = new TipDTO();
        tipDTO.setId(this.id);
        tipDTO.setPredictedTenthPlaceDriverId(this.predictedTenthPlaceDriver.getId()); // Pilóta neve
        return tipDTO;
    }
}
