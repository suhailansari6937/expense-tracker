package com.dev.expense.tracker.exception;

public class BudgetAlreadyExistsException
        extends RuntimeException {

    public BudgetAlreadyExistsException(String message) {
        super(message);
    }
}