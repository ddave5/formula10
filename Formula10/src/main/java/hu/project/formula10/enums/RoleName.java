package hu.project.formula10.enums;

public enum RoleName {
    USER, ADMIN;

    public String getAuthority() {
        return name();
    }
}
