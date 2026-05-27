
package com.dev.expense.tracker.repository;

import com.dev.expense.tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByCategory(String category);
    List<Expense> findByTitleContainingIgnoreCase(String title);
}

