package hu.project.formula10.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {
    private int statusCode;
    private String message;
    private boolean isDialog = false;

    public ErrorResponse(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    public ErrorResponse(int statusCode, String message, boolean isDialog) {
        this.statusCode = statusCode;
        this.message = message;
        this.isDialog = isDialog;
    }
}
