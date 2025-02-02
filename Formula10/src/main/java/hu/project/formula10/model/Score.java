package hu.project.formula10.model;

import hu.project.formula10.dto.ScoreDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table( name = "score")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "points_seq", sequenceName = "points_sequence", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tip_id", referencedColumnName = "id")
    private Tip tip;

    @Column(name = "point", nullable = false)
    private int point;

    public ScoreDTO toDTO() {
        return new ScoreDTO(this.getId(), this.getTip().getId(), this.getPoint());
    }
}
