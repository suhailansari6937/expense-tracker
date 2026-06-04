package com.dev.expense.tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BudgetResponseDTO {

    private Long id;
    private Double amount;
    private Integer month;
    private Integer year;
}