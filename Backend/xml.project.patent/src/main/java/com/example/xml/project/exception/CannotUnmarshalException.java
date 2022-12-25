package com.example.xml.project.exception;


import static com.example.xml.project.exception.ErrorMessagesConstants.UNMARSHALLER_EXCEPTION_MESSAGE;

public class CannotUnmarshalException extends AppException{

    public CannotUnmarshalException() {
        super(UNMARSHALLER_EXCEPTION_MESSAGE);
    }
}
