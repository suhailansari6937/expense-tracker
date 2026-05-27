package com.dev.expense.tracker.repository;

import com.dev.expense.tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User,Long> {
}
