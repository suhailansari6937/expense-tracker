package com.dev.expense.tracker.controller;

import com.dev.expense.tracker.dto.UserRequestDTO;
import com.dev.expense.tracker.dto.UserResponseDTO;
import com.dev.expense.tracker.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // CREATE USER
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(
            @Valid @RequestBody UserRequestDTO dto) {

        UserResponseDTO response =
                userService.createUser(dto);

        return ResponseEntity.status(201).body(response);
    }

    // GET ALL USERS
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>>
    getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }
}