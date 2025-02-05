package hu.project.formula10.service;

import hu.project.formula10.config.jwt.JwtTokenProvider;
import hu.project.formula10.dto.CreateUserDTO;
import hu.project.formula10.dto.UserDTO;
import hu.project.formula10.enums.RoleName;
import hu.project.formula10.model.Role;
import hu.project.formula10.model.User;
import hu.project.formula10.repository.RoleRepository;
import hu.project.formula10.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

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
            return false; // Felhasználónév vagy e-mail már létezik
        }
        String encodedPassword = passwordEncoder.encode(createUserDTO.getPasswordHash());
        User newUser = new User(createUserDTO.getUsername(), createUserDTO.getEmail(), encodedPassword);
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

}
