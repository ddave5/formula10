package hu.project.formula10.service;

import hu.project.formula10.config.jwt.JwtAuthenticationResponse;
import hu.project.formula10.config.jwt.JwtTokenProvider;
import hu.project.formula10.dto.LoginRequestDTO;
import hu.project.formula10.model.User;
import hu.project.formula10.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @CacheEvict(value = "users", key = "#loginDTO.usernameOrEmail")
    public JwtAuthenticationResponse loginUser(LoginRequestDTO loginDTO) {
        log.info("Fetching user with email/username by authService: {}", loginDTO.getUsernameOrEmail());
        User user = userRepository.findByUsernameOrEmail(loginDTO.getUsernameOrEmail(), loginDTO.getUsernameOrEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            return new JwtAuthenticationResponse(jwtTokenProvider.generateToken(user.getUsername(), loginDTO.isRememberMe()), user.toDTO());
        } else {
            throw new BadCredentialsException("Invalid credentials");
        }
    }
}
