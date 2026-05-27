package com.dev.expense.tracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


    @Getter
    @Setter
    @Entity
    public class Expense {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank(message = "Title required")
        private String title;

        @NotNull(message = "Amount required")
        private Double amount;

        @NotBlank(message = "category required")
        private String category;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

        public Expense() {
        }



}
