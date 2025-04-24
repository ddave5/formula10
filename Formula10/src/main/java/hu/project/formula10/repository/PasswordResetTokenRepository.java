package hu.project.formula10.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import hu.project.formula10.model.PasswordResetToken;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    boolean existsByEmail(String email);
    Optional<PasswordResetToken> findByToken(String token);
    @Transactional
    void deleteByEmail(String email);
}