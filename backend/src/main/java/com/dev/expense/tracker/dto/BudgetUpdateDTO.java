package com.dev.expense.tracker.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BudgetUpdateDTO {

    @NotNull(message = "Amount is required")
    private Double amount;
}