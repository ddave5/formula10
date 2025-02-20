package hu.project.formula10.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinGroupRequest {
    private Long userId;
    private Long groupId;
    private String password;
}
