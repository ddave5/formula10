package hu.project.formula10.config.audit;

import hu.project.formula10.service.AuditService;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreRemove;
import jakarta.persistence.PreUpdate;

public class AuditLogListener {

    private static AuditService auditService;

    public static void setAuditService(AuditService service) {
        auditService = service;
    }

    @PrePersist
    public void beforeCreate(Object entity) {
        auditService.publishAuditEvent(entity, "CREATE");
    }

    @PreUpdate
    public void beforeUpdate(Object entity) {
        auditService.publishAuditEvent(entity, "UPDATE");
    }

    @PreRemove
    public void beforeDelete(Object entity) {
        auditService.publishAuditEvent(entity, "DELETE");
    }
}

