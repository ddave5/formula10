package hu.project.formula10.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {

    private String username;
    private String email;
    private String password;

}
