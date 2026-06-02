package com.dev.expense.tracker.service;

import com.dev.expense.tracker.dto.ExpenseResponseDTO;
import com.dev.expense.tracker.dto.ExpenseRequestDTO;
import com.dev.expense.tracker.exception.AccessDeniedException;
import com.dev.expense.tracker.exception.ResourceNotFoundException;
import com.dev.expense.tracker.model.Expense;
import com.dev.expense.tracker.model.User;
import com.dev.expense.tracker.repository.ExpenseRepository;
import com.dev.expense.tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    private final UserRepository userRepository;

    public ExpenseService(
            ExpenseRepository expenseRepository,
            UserRepository userRepository) {

        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }
    public ExpenseResponseDTO createExpense(

            ExpenseRequestDTO dto) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));

        Expense expense = new Expense();

        expense.setTitle(dto.getTitle());
        expense.setAmount(dto.getAmount());
        expense.setCategory(dto.getCategory());

        // RELATIONSHIP SETTING
        expense.setUser(user);

        Expense savedExpense =
                expenseRepository.save(expense);

        ExpenseResponseDTO responseDTO =
                new ExpenseResponseDTO();

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
    // Get expenses by user
    public List<ExpenseResponseDTO> getMyExpenses() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        List<Expense> expenses =
                expenseRepository.findByUserId(user.getId());

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
    public ExpenseResponseDTO updateExpense(
            Long id,
            ExpenseRequestDTO updatedExpense) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Expense not found"));

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        if (!expense.getUser()
                .getEmail()
                .equals(email)) {

            throw new AccessDeniedException(
                    "You are not authorized to update this expense"
            );
        }

        expense.setTitle(updatedExpense.getTitle());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());

        Expense savedExpense =
                expenseRepository.save(expense);

        ExpenseResponseDTO responseDTO =
                new ExpenseResponseDTO();

        responseDTO.setId(savedExpense.getId());
        responseDTO.setTitle(savedExpense.getTitle());
        responseDTO.setAmount(savedExpense.getAmount());
        responseDTO.setCategory(savedExpense.getCategory());

        return responseDTO;
    }


    // DELETE
    public void deleteExpense(Long id) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Expense not found"));

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        if (!expense.getUser()
                .getEmail()
                .equals(email)) {

            throw new AccessDeniedException(
                    "You are not authorized to delete this expense"
            );
        }

        expenseRepository.delete(expense);
    }


}
