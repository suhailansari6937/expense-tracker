package com.dev.expense.tracker.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private int month;
    private int year;
    @ManyToOne
    private User user;
}
