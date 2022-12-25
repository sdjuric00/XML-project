package com.example.xml.project.exception;


import static com.example.xml.project.exception.ErrorMessagesConstants.UPDATE_ERROR_MESSAGE;

public class EntityUpdateException extends AppException {

    public EntityUpdateException() {
        super(UPDATE_ERROR_MESSAGE);
    }

    public EntityUpdateException(String message) {super(message);}
}