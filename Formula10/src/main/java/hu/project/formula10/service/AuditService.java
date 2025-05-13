package hu.project.formula10.service;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import hu.project.formula10.config.audit.AuditEvent;
import hu.project.formula10.config.audit.AuditLogListener;
import hu.project.formula10.model.AuditLog;
@Service
public class AuditService {

    private final ApplicationEventPublisher eventPublisher;

    public AuditService(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
        AuditLogListener.setAuditService(this);
    }

    public void publishAuditEvent(Object entity, String operation) {
        // Ne auditáljunk AuditLog típusokat!
        if (entity instanceof AuditLog) return;

        eventPublisher.publishEvent(new AuditEvent(entity, operation));
    }
}