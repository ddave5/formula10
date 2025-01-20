package hu.project.formula10.controller;

import hu.project.formula10.dto.CreateUserDTO;
import hu.project.formula10.dto.UserDTO;
import hu.project.formula10.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody CreateUserDTO createUserDTO) {
        UserDTO createdUser = userService.createUser(createUserDTO.getUsername(), createUserDTO.getEmail(), createUserDTO.getPasswordHash());
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
        Optional<UserDTO> user = userService.getUserByUsername(username);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
