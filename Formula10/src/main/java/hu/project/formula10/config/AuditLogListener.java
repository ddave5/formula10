package hu.project.formula10.config;

import hu.project.formula10.service.AuditService;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreRemove;
import jakarta.persistence.PreUpdate;

public class AuditLogListener {

    private static AuditService auditService;

    public static void setAuditService(AuditService service) {
        auditService = service;
    }

    @PostPersist
    public void beforeCreate(Object entity) {
        auditService.logOperation(entity, "CREATE");
    }

    @PreUpdate
    public void beforeUpdate(Object entity) {
        auditService.logOperation(entity, "UPDATE");
    }

    @PreRemove
    public void beforeDelete(Object entity) {
        auditService.logOperation(entity, "DELETE");
    }
}