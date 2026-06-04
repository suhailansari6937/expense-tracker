package com.dev.expense.tracker.repository;

import com.dev.expense.tracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BudgetRepository
        extends JpaRepository<Budget, Long> {

    Optional<Budget> findByUserIdAndMonthAndYear(
            Long userId,
            Integer month,
            Integer year
    );
}