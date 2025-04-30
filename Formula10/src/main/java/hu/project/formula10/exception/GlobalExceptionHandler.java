package hu.project.formula10.exception;

import java.sql.SQLException;

import javax.security.auth.login.CredentialException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException e) {
        log.error("Error: {}", e.getMessage());
        return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(), 
            "Internal Server error", 
            true
            ));
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(UsernameNotFoundException e) {
        log.error("Error: {}", e.getMessage());
        return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(new ErrorResponse(
            HttpStatus.NOT_FOUND.value(), 
            e.getMessage()));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException e) {
        log.error("Error: {}", e.getMessage());
        return ResponseEntity
        .status(HttpStatus.NOT_ACCEPTABLE)
        .body(new ErrorResponse(
            HttpStatus.NOT_ACCEPTABLE.value(), 
            e.getMessage()));
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<ErrorResponse> handleSqlException(SQLException e) {
        log.error("Error: {}", e.getMessage());
        return ResponseEntity
        .status(HttpStatus.NOT_IMPLEMENTED)
        .body(new ErrorResponse(
            HttpStatus.NOT_IMPLEMENTED.value(), 
            e.getMessage()));
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error("Error: {}", e.getMessage());
        return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(), 
            "Exception"));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException e) {
        log.error("Error: {}", e.getMessage());
        return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(), 
            e.getMessage()));
    }

    @ExceptionHandler(CredentialException.class)
    public ResponseEntity<ErrorResponse> handleCredentialException(CredentialException e) {
        log.error("Error: {}", e.getMessage());
        return ResponseEntity
        .status(HttpStatus.GONE)
        .body(new ErrorResponse(
            HttpStatus.GONE.value(), 
            "Token expired"));
    }
    
    @ExceptionHandler(RaceClosedException.class)
    public ResponseEntity<ErrorResponse> handleRaceClosedException(RaceClosedException e) {
        log.error("Error: {}", e.getMessage());
        return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(), 
            "Tip is closed during the grand prix.", 
            true
            ));
    }
}
