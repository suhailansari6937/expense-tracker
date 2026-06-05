package com.dev.expense.tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BudgetStatusDTO {

    private Double budget;
    private Double spent;
    private Double remaining;
}