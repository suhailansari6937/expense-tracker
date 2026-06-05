package com.dev.expense.tracker.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BudgetRequestDTO {

    @NotNull(message = "Amount is required")
    private Double amount;

    @NotNull(message = "Month is required")
    private Integer month;

    @NotNull(message = "Year is required")
    private Integer year;
}