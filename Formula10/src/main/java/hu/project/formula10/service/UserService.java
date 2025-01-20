package hu.project.formula10.service;

import hu.project.formula10.dto.UserDTO;
import hu.project.formula10.model.User;
import hu.project.formula10.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO createUser(String username, String email, String password) {
        String encodedPassword = passwordEncoder.encode(password);
        User newUser = new User(username, email, encodedPassword);
        User savedUser = userRepository.save(newUser);
        return new UserDTO(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getIsVerified(),
                savedUser.getCreatedAt()
        );
    }

    public Optional<UserDTO> getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(User::toDTO);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword); // Hash-elt jelszó összehasonlítása
    }
}
