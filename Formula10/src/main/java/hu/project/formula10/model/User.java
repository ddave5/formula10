package hu.project.formula10.model;

import hu.project.formula10.dto.UserDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_seq")
    @SequenceGenerator(name = "user_id_seq", sequenceName = "users_user_id_seq", allocationSize = 1)
    private Long id;

    @Column(nullable = false, unique = true, length = 50, name = "username")
    private String username;

    @Column(nullable = false, unique = true, length = 100, name = "email")
    private String email;

    @Column(nullable = false, length = 255, name = "passwordHash")
    private String password;

    @Column(nullable = false, name = "isVerified")
    private Boolean isVerified = false;

    @Column(nullable = false, updatable = false, name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "user")
    private List<GroupMember> groups;

    public User() { }

    public UserDTO toDTO() {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(this.id);
        userDTO.setUsername(this.username);
        userDTO.setEmail(this.email);
        userDTO.setCreatedAt(this.getCreatedAt());
        userDTO.setIsVerified(this.getIsVerified());
        return userDTO;
    }

}
