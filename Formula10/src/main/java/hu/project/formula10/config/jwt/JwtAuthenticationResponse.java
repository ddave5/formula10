package hu.project.formula10.config.jwt;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtAuthenticationResponse {

    private String token;

    public JwtAuthenticationResponse(String token) {
        this.token = token;
    }
}
