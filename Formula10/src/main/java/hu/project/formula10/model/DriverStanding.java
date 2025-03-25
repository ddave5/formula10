package hu.project.formula10.model;

import hu.project.formula10.dto.DriverStandingDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table( name = "driverstanding")
@Getter
@Setter
public class DriverStanding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "driver_id", referencedColumnName = "id", nullable = false)
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "season_id", referencedColumnName = "id", nullable = false)
    private Season season;

    @Column(name = "point")
    private int point; 

    public DriverStandingDTO toDTO(int position) {
        DriverStandingDTO dto = new DriverStandingDTO();
        dto.setDriverName(driver.getName());
        dto.setDriverNumber(driver.getRaceNumber());
        dto.setPosition(position);
        dto.setPoint(point);
        return dto;
    }
}
