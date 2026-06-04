package com.dev.expense.tracker.service;

import com.dev.expense.tracker.dto.BudgetRequestDTO;
import com.dev.expense.tracker.dto.BudgetResponseDTO;
import com.dev.expense.tracker.dto.BudgetStatusDTO;
import com.dev.expense.tracker.dto.BudgetUpdateDTO;
import com.dev.expense.tracker.exception.BudgetAlreadyExistsException;
import com.dev.expense.tracker.exception.ResourceNotFoundException;
import com.dev.expense.tracker.model.Budget;
import com.dev.expense.tracker.model.Expense;
import com.dev.expense.tracker.model.User;
import com.dev.expense.tracker.repository.BudgetRepository;
import com.dev.expense.tracker.repository.ExpenseRepository;
import com.dev.expense.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
    @RequiredArgsConstructor
    public class BudgetService {

        private final BudgetRepository budgetRepository;
        private final UserRepository userRepository;
    private final ExpenseRepository expenseRepository;

    public BudgetResponseDTO createBudget(
            BudgetRequestDTO dto) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        if (budgetRepository
                .findByUserIdAndMonthAndYear(
                        user.getId(),
                        dto.getMonth(),
                        dto.getYear())
                .isPresent()) {

            throw new BudgetAlreadyExistsException(
                    "Budget already exists for this month");
        }

        Budget budget = new Budget();

        budget.setAmount(dto.getAmount());
        budget.setMonth(dto.getMonth());
        budget.setYear(dto.getYear());
        budget.setUser(user);

        Budget savedBudget =
                budgetRepository.save(budget);

        return new BudgetResponseDTO(
                savedBudget.getId(),
                savedBudget.getAmount(),
                savedBudget.getMonth(),
                savedBudget.getYear()
        );
    }

        public BudgetStatusDTO getBudgetStatus(
                Integer month,
                Integer year) {

            String email = SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "User not found"));

            Budget budget = budgetRepository
                    .findByUserIdAndMonthAndYear(
                            user.getId(),
                            month,
                            year)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Budget not found"));

            List<Expense> expenses =
                    expenseRepository.findByUserId(
                            user.getId());

            double spent = expenses.stream()
                    .filter(expense ->
                            expense.getExpenseDate()
                                    .getMonthValue() == month
                                    &&
                                    expense.getExpenseDate()
                                            .getYear() == year)
                    .mapToDouble(Expense::getAmount)
                    .sum();

            double remaining =
                    budget.getAmount() - spent;

            return new BudgetStatusDTO(
                    budget.getAmount(),
                    spent,
                    remaining
            );
        }


    public BudgetResponseDTO updateBudget(
            Integer month,
            Integer year,
            BudgetUpdateDTO dto) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Budget budget = budgetRepository
                .findByUserIdAndMonthAndYear(
                        user.getId(),
                        month,
                        year)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Budget not found"));

        budget.setAmount(dto.getAmount());

        Budget savedBudget =
                budgetRepository.save(budget);

        return new BudgetResponseDTO(
                savedBudget.getId(),
                savedBudget.getAmount(),
                savedBudget.getMonth(),
                savedBudget.getYear()
        );
    }

    public String deleteBudget(
            Integer month,
            Integer year) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Budget budget = budgetRepository
                .findByUserIdAndMonthAndYear(
                        user.getId(),
                        month,
                        year)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Budget not found"));

        budgetRepository.delete(budget);

        return "Budget deleted successfully";
    }

}
