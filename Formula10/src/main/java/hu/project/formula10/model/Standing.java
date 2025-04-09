package hu.project.formula10.model;

import org.hibernate.annotations.Immutable;

import hu.project.formula10.dto.StandingDTO;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "standing")
@Immutable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Standing {

    @EmbeddedId
    private StandingId id;

    @Column(name = "total_points")
    private Integer totalPoints;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seasonid", insertable = false, updatable = false)
    private Season season;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "groupid", insertable = false, updatable = false)
    private Group group;

    public StandingDTO toDTO() {
        return StandingDTO.builder()
            .groupId(id.getGroupid())
            .seasonId(id.getSeasonid())
            .seasonYear(season.getYear())
            .userId(id.getUserid())
            .username(user.getUsername())
            .totalPoints(totalPoints)
            .build();
    }
}
