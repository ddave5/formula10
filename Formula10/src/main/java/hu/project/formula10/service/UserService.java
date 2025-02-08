package hu.project.formula10.service;

import hu.project.formula10.config.jwt.JwtTokenProvider;
import hu.project.formula10.dto.CreateUserDTO;
import hu.project.formula10.dto.UserDTO;
import hu.project.formula10.enums.RoleName;
import hu.project.formula10.model.Role;
import hu.project.formula10.model.User;
import hu.project.formula10.repository.RoleRepository;
import hu.project.formula10.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.roleRepository = roleRepository;
    }

    public boolean createUser(CreateUserDTO createUserDTO) {
        if (userRepository.existsByUsername(createUserDTO.getUsername()) ||
                userRepository.existsByEmail(createUserDTO.getEmail())) {
            log.error("Felhasználó név már használva van!");
        }
        String encodedPassword = passwordEncoder.encode(createUserDTO.getPassword());
        User newUser = new User(createUserDTO.getName(), createUserDTO.getUsername(), createUserDTO.getEmail(), encodedPassword);
        Role userRole = roleRepository.findByName(RoleName.USER)
                .orElseThrow(() -> new RuntimeException("Felhasználói szerepkör nem található."));
        newUser.setRoles(Collections.singleton(userRole));
        userRepository.save(newUser);
        return true;
    }

    public Optional<UserDTO> getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(User::toDTO);
    }

    public String authenticateUser(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return tokenProvider.generateToken(authentication.getName());
    }

    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }

    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }

}
