package com.dev.expense.tracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {
    @NotNull(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
}
