package com.dev.expense.tracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ExpenseRequestDTO {
    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Amount is required")
    private Double amount;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Expense date is required")
    private LocalDate expenseDate;


}
