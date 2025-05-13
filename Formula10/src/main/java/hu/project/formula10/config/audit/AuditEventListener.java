package hu.project.formula10.config.audit;

import java.lang.reflect.Field;
import java.time.LocalDateTime;

import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import hu.project.formula10.model.AuditLog;
import hu.project.formula10.repository.AuditLogRepository;
import jakarta.persistence.Id;

@Component
public class AuditEventListener {

    private final AuditLogRepository auditLogRepository;

    public AuditEventListener(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAuditEvent(AuditEvent event) {
        Object entity = event.getEntity();
        if (entity instanceof AuditLog) return;

        AuditLog log = new AuditLog();
        log.setEntity(entity.getClass().getSimpleName());
        log.setEntityId(getEntityId(entity));
        log.setOperation(event.getOperation());
        log.setTimestamp(LocalDateTime.now());

        auditLogRepository.save(log);
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
