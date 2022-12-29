package com.example.xml.project.exception;

import static com.example.xml.project.exception.ErrorMessagesConstants.XPATH_EXCEPTION_MESSAGE;

public class XPathException extends AppException{

    public XPathException() {
        super(XPATH_EXCEPTION_MESSAGE);
    }
}

