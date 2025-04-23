package hu.project.formula10.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hu.project.formula10.model.PasswordResetToken;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByEmail(String email);
}