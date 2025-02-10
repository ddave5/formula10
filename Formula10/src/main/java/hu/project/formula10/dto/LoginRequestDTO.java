package hu.project.formula10.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {

    private String usernameOrEmail;
    private String password;
    private boolean rememberMe;

}
