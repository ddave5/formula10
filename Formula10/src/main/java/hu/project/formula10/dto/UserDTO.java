package hu.project.formula10.dto;

import hu.project.formula10.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String name;
    private String username;
    private String email;
    private Boolean isVerified;
    private LocalDateTime createdAt;
    private List<Role> role;
}
