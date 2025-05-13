package hu.project.formula10.model;

import hu.project.formula10.config.audit.AuditLogListener;
import hu.project.formula10.dto.TipDTO;
import hu.project.formula10.enums.TipType;
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
@EntityListeners(AuditLogListener.class)
public class Tip {
    @Id
    @SequenceGenerator(name = "tip_seq", sequenceName = "tip_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tip_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "raceid", referencedColumnName = "id", nullable = false)
    private Race race;

    @ManyToOne
    @JoinColumn(name = "driverid", referencedColumnName = "id", nullable = false)
    private Driver predictedDriver;

    @ManyToOne
    @JoinColumn(name = "groupid", referencedColumnName = "id", nullable = false)
    private Group group;

    @ManyToOne
    @JoinColumn(name = "seasonid", referencedColumnName = "id", nullable = false)
    private Season season;

    @Column(name = "tipdate")
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "tip_type", nullable = false)
    private TipType tipType;

    public TipDTO toDTO() {
        return new TipDTO(
                this.getId(),
                this.getUser().getId(),
                this.group.getId(),
                this.season.getId(),
                this.race.getId(),
                this.predictedDriver.getId(),
                this.createdAt,
                this.tipType.name()
        );
    }
}
