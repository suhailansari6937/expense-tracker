package com.dev.expense.tracker.service;

import com.dev.expense.tracker.dto.ExpenseResponseDTO;
import com.dev.expense.tracker.dto.ExpenseRequestDTO;
import com.dev.expense.tracker.exception.ResourceNotFoundException;
import com.dev.expense.tracker.model.Expense;
import com.dev.expense.tracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<ExpenseResponseDTO> getAllExpenses() {

        List<Expense> expenses = expenseRepository.findAll();

        return expenses.stream().map(expense -> {

            ExpenseResponseDTO dto = new ExpenseResponseDTO();

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
