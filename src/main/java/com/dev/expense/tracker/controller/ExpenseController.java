package com.dev.expense.tracker.controller;

import com.dev.expense.tracker.dto.ExpenseRequestDTO;
import com.dev.expense.tracker.dto.ExpenseResponseDTO;
import org.springframework.http.ResponseEntity;
import com.dev.expense.tracker.model.Expense;
import com.dev.expense.tracker.repository.ExpenseRepository;
import com.dev.expense.tracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // CREATE

    @PostMapping
    public ExpenseResponseDTO createExpense(
            @Valid @RequestBody ExpenseRequestDTO expenseRequestDTO) {

        return expenseService.createExpense(expenseRequestDTO);
    }

    // READ
    @GetMapping
    public List<ExpenseResponseDTO> getAllExpenses() {
        return expenseService.getAllExpenses();
    }


    // UPDATE
    @PutMapping("/{id}")
    public ExpenseResponseDTO updateExpense(@PathVariable Long id,
                                 @Valid @RequestBody ExpenseRequestDTO expenseRequestDTO) {

        return expenseService.updateExpense(id, expenseRequestDTO);
    }


    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long id) {

        expenseService.deleteExpense(id);

        return ResponseEntity.ok("Expense deleted successfully");
    }
}