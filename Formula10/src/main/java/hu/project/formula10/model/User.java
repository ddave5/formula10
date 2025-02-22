package hu.project.formula10.model;

import hu.project.formula10.dto.UserDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Column(nullable = false, name = "password_hash")
    private String password;

    @Column(nullable = false, name = "is_verified")
    private Boolean isVerified = false;

    @Column(nullable = false, updatable = false, name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "user")
    private List<GroupMember> groups;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User() { }

    public User(String username, String email, String passwordHash) {
        this.username = username;
        this.email = email;
        this.password = passwordHash;
        this.isVerified = false;
        this.createdAt = LocalDateTime.now();
    }

    public UserDTO toDTO() {
        return new UserDTO(this.getId(), this.getUsername(), this.getEmail(), this.getIsVerified(), this.getCreatedAt(), new ArrayList<>(this.roles));
    }

}
