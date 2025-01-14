package hu.project.formula10.model;

import hu.project.formula10.dto.GroupDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "group")
@Getter
@Setter
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "group")
    private List<Season> seasons;

    private Long activeSeasonId;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<GroupMember> members;

    public GroupDTO toDTO() {
        GroupDTO groupDTO = new GroupDTO();
        groupDTO.setId(this.id);
        groupDTO.setName(this.name);
        groupDTO.setMembers(this.members.stream()
                .map(GroupMember::toDTO)
                .collect(Collectors.toList()));
        return groupDTO;
    }
}
