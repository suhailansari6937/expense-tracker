package com.dev.expense.tracker.exception;

public class AccessDeniedException
        extends RuntimeException {

    public AccessDeniedException(String message) {
        super(message);
    }
}