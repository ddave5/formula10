package hu.project.formula10.model;

import hu.project.formula10.dto.GroupMemberDTO;
import hu.project.formula10.enums.GroupRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "group_members")
@Getter
@Setter
public class GroupMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private GroupRole role;

    private LocalDate joinDate;

    public GroupMember(Group group, User user, GroupRole role, LocalDate joinDate) {
        this.group = group;
        this.user = user;
        this.role = role;
        this.joinDate = joinDate;
    }

    public GroupMember() {

    }

    public GroupMemberDTO toDTO() {
        GroupMemberDTO memberDTO = new GroupMemberDTO();
        memberDTO.setId(this.id);
        memberDTO.setUsername(this.user.getUsername());
        memberDTO.setRole(this.role);
        memberDTO.setJoinDate(this.joinDate);
        return memberDTO;
    }
}
