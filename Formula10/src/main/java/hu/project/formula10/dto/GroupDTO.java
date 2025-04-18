package hu.project.formula10.dto;

import hu.project.formula10.enums.GroupAvailability;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GroupDTO {

    private Long id;
    private String name;
    private List<GroupMemberDTO> members;
    private GroupAvailability availability;
}
