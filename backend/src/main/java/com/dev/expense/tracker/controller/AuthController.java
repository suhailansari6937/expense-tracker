package com.dev.expense.tracker.controller;

import com.dev.expense.tracker.dto.LoginRequestDTO;
import com.dev.expense.tracker.dto.LoginResponseDTO;
import com.dev.expense.tracker.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO dto) {

        return ResponseEntity.ok(
                authService.login(dto)
        );
    }
}