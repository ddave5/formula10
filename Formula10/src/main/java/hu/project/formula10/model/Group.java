package hu.project.formula10.model;

import hu.project.formula10.dto.GroupDTO;
import hu.project.formula10.enums.GroupAvailability;
import hu.project.formula10.enums.RoleName;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "groups")
@Getter
@Setter
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "group_name")
    private String name;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private GroupAvailability availability;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<GroupMember> members = new ArrayList<>();

    public GroupDTO toDTO() {
        GroupDTO groupDTO = new GroupDTO();
        groupDTO.setId(this.id);
        groupDTO.setName(this.name);
        groupDTO.setMembers(this.members.stream()
                .map(GroupMember::toDTO)
                .collect(Collectors.toList()));
        groupDTO.setAvailability(this.availability);
        return groupDTO;
    }
}
