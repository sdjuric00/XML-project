package com.example.xml.project.exception;

public class EntityNotFoundException extends AppException {
    public EntityNotFoundException(String id) {
        super(id);
    }

    public EntityNotFoundException(Long id) {
        super(id.toString());
    }
}
