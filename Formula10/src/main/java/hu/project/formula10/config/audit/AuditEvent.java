package hu.project.formula10.config.audit;

import org.springframework.context.ApplicationEvent;

public class AuditEvent extends ApplicationEvent {
    private final Object entity;
    private final String operation;

    public AuditEvent(Object entity, String operation) {
        super(entity);
        this.entity = entity;
        this.operation = operation;
    }

    public Object getEntity() { return entity; }
    public String getOperation() { return operation; }
}
