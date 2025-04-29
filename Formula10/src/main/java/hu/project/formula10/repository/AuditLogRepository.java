package hu.project.formula10.repository;

import org.springframework.stereotype.Repository;

import hu.project.formula10.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {}