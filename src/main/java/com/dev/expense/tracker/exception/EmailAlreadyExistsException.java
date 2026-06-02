package com.dev.expense.tracker.exception;

public class EmailAlreadyExistsException
        extends RuntimeException {

    public EmailAlreadyExistsException(
            String message) {

        super(message);
    }
}