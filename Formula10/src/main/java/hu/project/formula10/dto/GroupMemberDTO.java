package hu.project.formula10.dto;

import hu.project.formula10.enums.GroupRole;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class GroupMemberDTO {

    private Long id;
    private String username;
    private String role;
    private LocalDate joinDate;
}
