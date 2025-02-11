package hu.project.formula10.config.jwt;

import hu.project.formula10.dto.UserDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtAuthenticationResponse {

    private String token;

    private UserDTO userDTO;

    public JwtAuthenticationResponse(String token, UserDTO userDTO) {
        this.token = token;
        this.userDTO = userDTO;
    }
}
