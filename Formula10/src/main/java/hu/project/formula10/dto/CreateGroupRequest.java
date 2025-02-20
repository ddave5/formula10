package hu.project.formula10.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateGroupRequest {
    private String name;
    private String password;
    private Long userId;
}
