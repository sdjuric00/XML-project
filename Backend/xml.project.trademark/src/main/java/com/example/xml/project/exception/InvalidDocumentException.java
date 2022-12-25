package com.example.xml.project.exception;

import static com.example.xml.project.exception.ErrorMessagesConstants.INVALID_DOCUMENT_EXCEPTION_MESSAGE;

public class InvalidDocumentException extends AppException{

    public InvalidDocumentException() {
        super(INVALID_DOCUMENT_EXCEPTION_MESSAGE);
    }
}
