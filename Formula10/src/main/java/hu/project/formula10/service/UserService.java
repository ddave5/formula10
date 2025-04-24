package hu.project.formula10.service;

import hu.project.formula10.dto.CreateUserDTO;
import hu.project.formula10.dto.UserDTO;
import hu.project.formula10.enums.RoleName;
import hu.project.formula10.model.PasswordResetToken;
import hu.project.formula10.model.Role;
import hu.project.formula10.model.User;
import hu.project.formula10.repository.PasswordResetTokenRepository;
import hu.project.formula10.repository.RoleRepository;
import hu.project.formula10.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import javax.security.auth.login.CredentialException;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final MailService mailService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    @Value("${frontend.url}")
    private String frontendUrl;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       RoleRepository roleRepository, 
                       MailService mailService,
                       PasswordResetTokenRepository passwordResetTokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.mailService = mailService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
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
        newUser.setRole(userRole);
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

    public UserDTO changePassword(String token, String password) throws CredentialException, SQLException {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
            .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new CredentialException();
        }

        String email = resetToken.getEmail();

        log.info("Fetching user by email: {}", email);
        User user = userRepository
                .findByEmail(email)
                .orElseThrow( () -> new SQLException("No user with this email address"));

        user.setPassword(passwordEncoder.encode(password));

        log.info("Delete token from database");
        passwordResetTokenRepository.delete(resetToken);

        log.info("Save user with the new password");
        return userRepository.save(user).toDTO();
    }

    public UserDTO changeEmail(String email, Long userId) throws Exception {
        log.info("Fetching user by email: {}", email);
        User user = userRepository.findById(userId).orElseThrow( () -> new SQLException("No user with this id"));

        user.setEmail(email);

        log.info("Save user with the new email");
        return userRepository.save(user).toDTO();
    }

    public Boolean checkOldPassword(String oldPassword, Long userId) throws SQLException {
        log.info("Fetching user by id: {}", userId);
        User user = userRepository.findById(userId).orElseThrow( () -> new SQLException("No user with this id"));

        return passwordEncoder.matches(oldPassword, user.getPassword());        
    }

    public void deleteUser (Long userId) throws SQLException {
        log.info("Delete user by id: {}", userId);
        User user = userRepository.findById(userId).orElseThrow( () -> new SQLException("No user with this id"));
        userRepository.delete(user);
    }

    public void requestPasswordReset(String email) throws SQLException {
        userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("No user with this email"));

        String token = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(10);

        if (passwordResetTokenRepository.existsByEmail(email)) {
            passwordResetTokenRepository.deleteByEmail(email);
        }
        passwordResetTokenRepository.save(new PasswordResetToken(token, email, expiry));

        String resetUrl = frontendUrl + "/reset-password?token=" + token;
        mailService.sendResetPasswordEmail(email, resetUrl);
    }

}
