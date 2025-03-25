package hu.project.formula10.model;

import hu.project.formula10.dto.ConstructorStandingDTO;
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
@Table( name = "constructorstanding")
@Getter
@Setter
public class ConstructorStanding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "constructor_id", referencedColumnName = "id", nullable = false)
    private Constructor constructor;

    @ManyToOne
    @JoinColumn(name = "season_id", referencedColumnName = "id", nullable = false)
    private Season season;

    @Column(name = "point")
    private int point;

    public ConstructorStandingDTO toDTO(int position) {
        ConstructorStandingDTO dto = new ConstructorStandingDTO();
        dto.setConstructorName(constructor.getName());
        dto.setPosition(position);
        dto.setPoint(point);
        return dto;
    }
}
