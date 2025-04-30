package hu.project.formula10.service;

import java.lang.reflect.Field;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import hu.project.formula10.config.AuditLogListener;
import hu.project.formula10.model.AuditLog;
import hu.project.formula10.repository.AuditLogRepository;
import jakarta.persistence.Id;

@Service
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public AuditService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
        AuditLogListener.setAuditService(this);
    }

    public void logOperation(Object entity, String operation) {
        AuditLog log = new AuditLog();
        log.setEntity(entity.getClass().getSimpleName());
        log.setEntityId(getEntityId(entity));
        log.setOperation(operation);
        log.setTimestamp(LocalDateTime.now());

        auditLogRepository.saveAndFlush(log);
    }

    private String getEntityId(Object entity) {
        try {
            for (Field field : entity.getClass().getDeclaredFields()) {
                if (field.isAnnotationPresent(Id.class)) {
                    field.setAccessible(true);
                    Object idValue = field.get(entity);
                    return idValue != null ? idValue.toString() : "null";
                }
            }
        } catch (IllegalAccessException e) {
            throw new RuntimeException("Cannot access ID field of entity: " + entity.getClass(), e);
        }
        return "unknown";
    }
}