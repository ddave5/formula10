package hu.project.formula10.service;

import hu.project.formula10.dto.CreateUserDTO;
import hu.project.formula10.dto.UserDTO;
import hu.project.formula10.enums.RoleName;
import hu.project.formula10.model.Role;
import hu.project.formula10.model.User;
import hu.project.formula10.repository.RoleRepository;
import hu.project.formula10.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    public boolean createUser(CreateUserDTO createUserDTO) {
        if (userRepository.existsByUsername(createUserDTO.getUsername() )) {
            log.error("Felhasználó név már használva van!");
        }
        String encodedPassword = passwordEncoder.encode(createUserDTO.getPassword());

        log.info("Create user");

        User newUser = new User(createUserDTO.getUsername(), createUserDTO.getEmail(), encodedPassword);
        Role userRole = roleRepository.findByName(RoleName.USER)
                .orElseThrow(() -> new RuntimeException("Felhasználói szerepkör nem található."));
        newUser.setRoles(Collections.singleton(userRole));
        userRepository.save(newUser);
        return true;
    }

    public Optional<UserDTO> getUserByUsername(String username) {
        log.info("Fetching user by username: {}", username);
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(User::toDTO);
    }

    public boolean isUsernameAvailable(String username) {
        log.info("Check username is taken");
        return !userRepository.existsByUsername(username);
    }

    public boolean isEmailAvailable(String email) {
        log.info("Check email address is taken");
        return !userRepository.existsByEmail(email);
    }

    public UserDTO changePassword(String email, String password) throws Exception {
        log.info("Fetching user by email: {}", email);
        User user = userRepository
                .findByEmail(email)
                .orElseThrow( () -> new Exception("No user with this email address"));

        user.setPassword(passwordEncoder.encode(password));

        log.info("Save user with the new password");
        return userRepository.save(user).toDTO();
    }

}
