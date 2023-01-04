package com.example.xml.project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.security.sasl.AuthenticationException;
import java.nio.file.AccessDeniedException;
import java.util.Optional;

import static com.example.xml.project.exception.ErrorMessagesConstants.UNAUTHORIZED_MESSAGE;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String entityNotFoundException(EntityNotFoundException entityNotFoundException) {

        return entityNotFoundException.getMessage();
    }

    @ExceptionHandler(value = PasswordsDoNotMatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String passwordsDoNotMatchException(PasswordsDoNotMatchException passwordsDoNotMatchException) {

        return passwordsDoNotMatchException.getMessage();
    }

    @ExceptionHandler(value = EntityAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String entityAlreadyExistsException(EntityAlreadyExistsException entityAlreadyExists) {

        return entityAlreadyExists.getMessage();
    }

    @ExceptionHandler(value = MailCannotBeSentException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String mailCannotBeSentException(MailCannotBeSentException mailCannotBeSentException) {

        return mailCannotBeSentException.getMessage();
    }

    @ExceptionHandler(value = EntityUpdateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String entityUpdateException(EntityUpdateException usersUpdateException) {

        return usersUpdateException.getMessage();
    }

    @ExceptionHandler(value = CannotUnmarshalException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String cannotUnmarshalException(CannotUnmarshalException cannotUnmarshalException) {

        return cannotUnmarshalException.getMessage();
    }

    @ExceptionHandler(value = InvalidDocumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String invalidDocumentException(InvalidDocumentException invalidDocumentException) {

        return invalidDocumentException.getMessage();
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected String handleMethodArgumentNotValid(MethodArgumentNotValidException methodArgumentNotValidException) {
        Optional<FieldError> error = methodArgumentNotValidException.getBindingResult().getFieldErrors().stream().findFirst();

        return error.map(
            fieldError -> String.format("%s", fieldError.getDefaultMessage()))
            .orElse("Error not found");
    }


    @ExceptionHandler({ AuthenticationException.class, AccessDeniedException.class })
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public final String handleAccessDeniedException(Exception ex) {

        return UNAUTHORIZED_MESSAGE;
    }

    @ExceptionHandler({ TransformationFailedException.class})
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public final String handleTransformationFailedException(TransformationFailedException ex) {

        return ex.getMessage();
    }
}
