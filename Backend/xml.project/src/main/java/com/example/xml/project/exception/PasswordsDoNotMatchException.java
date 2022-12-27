package com.example.xml.project.exception;

import static com.example.xml.project.exception.ErrorMessagesConstants.LOZINKE_SE_NE_POKLAPAJU;

public class PasswordsDoNotMatchException extends AppException {

    public PasswordsDoNotMatchException() {
        super(LOZINKE_SE_NE_POKLAPAJU);
    }

    public PasswordsDoNotMatchException(String message) {
        super(message);
    }
}
