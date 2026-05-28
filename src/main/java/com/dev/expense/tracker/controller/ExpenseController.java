package com.dev.expense.tracker.controller;

import com.dev.expense.tracker.dto.ExpenseRequestDTO;
import com.dev.expense.tracker.dto.ExpenseResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    @PostMapping("/users/{userId}")
    public ResponseEntity<ExpenseResponseDTO> createExpense(

            @PathVariable Long userId,

            @Valid
            @RequestBody ExpenseRequestDTO expenseRequestDTO
    ) {

        ExpenseResponseDTO response =
                expenseService.createExpense(
                        userId,
                        expenseRequestDTO
                );

        return ResponseEntity.status(201).body(response);
    }

    // READ

    @GetMapping
    public ResponseEntity<Page<ExpenseResponseDTO>> getAllExpenses(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "id") String sortBy,

            @RequestParam(defaultValue = "asc") String direction
    ) {

        return ResponseEntity.ok(
                expenseService.getAllExpenses(page, size, sortBy,direction)
        );
    }
    // category api
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ExpenseResponseDTO>>
    getExpensesByCategory(@PathVariable String category) {

        return ResponseEntity.ok(
                expenseService.getExpensesByCategory(category)
        );
    }
    @GetMapping("/users/{userId}")
    public ResponseEntity<List<ExpenseResponseDTO>> getExpensesByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                expenseService.getExpensesByUser(userId)
        );
    }
    // search
    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<ExpenseResponseDTO>>
    searchExpenses(@PathVariable String keyword) {

        return ResponseEntity.ok(
                expenseService.searchExpenses(keyword)
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequestDTO expenseRequestDTO) {

        return ResponseEntity.ok(
                expenseService.updateExpense(id, expenseRequestDTO)
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long id) {

        expenseService.deleteExpense(id);

        return ResponseEntity.ok("Expense deleted successfully");
    }
}