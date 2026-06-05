package com.dev.expense.tracker.controller;

import com.dev.expense.tracker.dto.BudgetRequestDTO;
import com.dev.expense.tracker.dto.BudgetResponseDTO;
import com.dev.expense.tracker.dto.BudgetStatusDTO;
import com.dev.expense.tracker.dto.BudgetUpdateDTO;
import com.dev.expense.tracker.service.BudgetService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/budget")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(
            BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping
    public BudgetResponseDTO createBudget(
            @Valid
            @RequestBody
            BudgetRequestDTO dto) {

        return budgetService.createBudget(dto);
    }

    @GetMapping("/status")
    public BudgetStatusDTO getBudgetStatus(
            @RequestParam Integer month,
            @RequestParam Integer year) {

        return budgetService
                .getBudgetStatus(month, year);
    }

    // update
    @PutMapping
    public BudgetResponseDTO updateBudget(
            @RequestParam Integer month,
            @RequestParam Integer year,
            @Valid @RequestBody BudgetUpdateDTO dto) {

        return budgetService.updateBudget(
                month,
                year,
                dto
        );
    }

    @DeleteMapping
    public String deleteBudget(
            @RequestParam Integer month,
            @RequestParam Integer year) {

        return budgetService.deleteBudget(
                month,
                year
        );
    }
}