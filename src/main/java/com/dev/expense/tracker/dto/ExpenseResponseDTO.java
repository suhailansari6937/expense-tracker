package com.dev.expense.tracker.dto;

public class ExpenseResponseDTO {

    private Long id;
    private String title;
    private Double amount;
    private String category;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public String getTitle() {
        return title;
    }

    public Double getAmount() {
        return amount;
    }
}
