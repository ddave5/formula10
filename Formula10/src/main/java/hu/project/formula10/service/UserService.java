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

    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }

    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }

}
