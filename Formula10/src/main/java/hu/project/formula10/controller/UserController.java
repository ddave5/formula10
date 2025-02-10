package hu.project.formula10.controller;

import hu.project.formula10.config.jwt.JwtAuthenticationResponse;
import hu.project.formula10.dto.CreateUserDTO;
import hu.project.formula10.dto.LoginRequestDTO;
import hu.project.formula10.dto.UserDTO;
import hu.project.formula10.service.AuthService;
import hu.project.formula10.service.UserService;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final AuthService authService;
    private final MessageSource messageSource;

    public UserController(UserService userService, AuthService authService, MessageSource messageSource) {
        this.userService = userService;
        this.authService = authService;
        this.messageSource = messageSource;
    }

    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsernameAvailability(@RequestParam String username) {
        boolean isAvailable = userService.isUsernameAvailable(username);
        return ResponseEntity.ok(isAvailable);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody CreateUserDTO createUserDTO, @RequestHeader("Accept-Language") Locale locale) {
        try {
            if (!userService.isEmailAvailable(createUserDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageSource.getMessage("email.used", null, locale));
            }

            boolean isRegistered = userService.createUser(createUserDTO);
            Map<String, Boolean> response = new HashMap<>();
            response.put("success", isRegistered);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("registration.fail", null, locale));
       }
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
        Optional<UserDTO> user = userService.getUserByUsername(username);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDTO loginRequest, Locale locale) {
        try {
            String token = authService.loginUser(loginRequest);
            return ResponseEntity.ok(new JwtAuthenticationResponse(token));
        } catch (UsernameNotFoundException | BadCredentialsException ex) {
            String errorMessage = messageSource.getMessage("login.invalid.credentials", null, locale);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
        }
    }
}
