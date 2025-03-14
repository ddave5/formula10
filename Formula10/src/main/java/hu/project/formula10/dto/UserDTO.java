package hu.project.formula10.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String username;
    private String email;
    private Boolean isVerified;
    private LocalDateTime createdAt;
    private String role;
}
