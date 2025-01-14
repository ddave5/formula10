package hu.project.formula10.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GroupDTO {

    private Long id;
    private String name;
    private List<GroupMemberDTO> members;
}
