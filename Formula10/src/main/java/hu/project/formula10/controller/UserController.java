package hu.project.formula10.controller;

import hu.project.formula10.config.jwt.JwtAuthenticationResponse;
import hu.project.formula10.dto.CreateUserDTO;
import hu.project.formula10.dto.LoginRequestDTO;
import hu.project.formula10.dto.UserDTO;
import hu.project.formula10.service.AuthService;
import hu.project.formula10.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    public UserController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody CreateUserDTO createUserDTO) {
        boolean isRegistered = userService.createUser(createUserDTO);
        return ResponseEntity.ok(isRegistered);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
        Optional<UserDTO> user = userService.getUserByUsername(username);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDTO loginRequest) {
        String token = authService.loginUser(loginRequest);
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }
}
