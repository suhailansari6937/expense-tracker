package com.dev.expense.tracker.service;

import com.dev.expense.tracker.dto.ExpenseResponseDTO;
import com.dev.expense.tracker.dto.ExpenseRequestDTO;
import com.dev.expense.tracker.exception.ResourceNotFoundException;
import com.dev.expense.tracker.model.Expense;
import com.dev.expense.tracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;

    public ExpenseResponseDTO createExpense(ExpenseRequestDTO dto) {

        Expense expense = new Expense();

        expense.setTitle(dto.getTitle());
        expense.setAmount(dto.getAmount());
        expense.setCategory(dto.getCategory());

        Expense savedExpense = expenseRepository.save(expense);

        ExpenseResponseDTO responseDTO = new ExpenseResponseDTO();

        responseDTO.setId(savedExpense.getId());
        responseDTO.setTitle(savedExpense.getTitle());
        responseDTO.setAmount(savedExpense.getAmount());
        responseDTO.setCategory(savedExpense.getCategory());

        return responseDTO;
    }
    public Page<ExpenseResponseDTO> getAllExpenses(
            int page,
            int size,
            String sortBy, String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(
                page,
                size,
                sort
        );

        Page<Expense> expensePage =
                expenseRepository.findAll(pageable);

        return expensePage.map(expense -> {

            ExpenseResponseDTO dto =
                    new ExpenseResponseDTO();

            dto.setId(expense.getId());
            dto.setTitle(expense.getTitle());
            dto.setAmount(expense.getAmount());
            dto.setCategory(expense.getCategory());

            return dto;
        });
    }
    // Find by category
    public List<ExpenseResponseDTO> getExpensesByCategory(
            String category) {

        List<Expense> expenses =
                expenseRepository.findByCategory(category);

        return expenses.stream().map(expense -> {

            ExpenseResponseDTO dto =
                    new ExpenseResponseDTO();

            dto.setId(expense.getId());
            dto.setTitle(expense.getTitle());
            dto.setAmount(expense.getAmount());
            dto.setCategory(expense.getCategory());

            return dto;

        }).toList();
    }

    // search
    public List<ExpenseResponseDTO> searchExpenses(
            String keyword) {

        List<Expense> expenses =
                expenseRepository
                        .findByTitleContainingIgnoreCase(keyword);

        return expenses.stream().map(expense -> {

            ExpenseResponseDTO dto =
                    new ExpenseResponseDTO();

            dto.setId(expense.getId());
            dto.setTitle(expense.getTitle());
            dto.setAmount(expense.getAmount());
            dto.setCategory(expense.getCategory());

            return dto;

        }).toList();
    }
    public ExpenseResponseDTO updateExpense(Long id, ExpenseRequestDTO updatedExpense) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Expense not found"));

        expense.setTitle(updatedExpense.getTitle());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());

        Expense savedExpense = expenseRepository.save(expense);

        ExpenseResponseDTO responseDTO = new ExpenseResponseDTO();

        responseDTO.setId(savedExpense.getId());
        responseDTO.setTitle(savedExpense.getTitle());
        responseDTO.setAmount(savedExpense.getAmount());
        responseDTO.setCategory(savedExpense.getCategory());

        return responseDTO;
    }


    // DELETE
    public void deleteExpense(Long id) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->  new ResourceNotFoundException("Expense not found"));

        expenseRepository.delete(expense);
    }


}
