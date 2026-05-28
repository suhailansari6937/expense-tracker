package com.dev.expense.tracker.service;

import com.dev.expense.tracker.dto.UserRequestDTO;
import com.dev.expense.tracker.dto.UserResponseDTO;
import com.dev.expense.tracker.model.User;
import com.dev.expense.tracker.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final BCryptPasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder=passwordEncoder;
    }

    //CREATE USer
    public UserResponseDTO createUser(UserRequestDTO dto){

        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());

        user.setPassword(
                passwordEncoder.encode(dto.getPassword())
        );

        User savedUser = userRepository.save(user);

        UserResponseDTO responseDTO =
                new UserResponseDTO();

        responseDTO.setId(savedUser.getId());
        responseDTO.setName(savedUser.getName());
        responseDTO.setEmail(savedUser.getEmail());

        return responseDTO;
    }

    // GET ALL USERS
    public List<UserResponseDTO> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {

            UserResponseDTO dto =
                    new UserResponseDTO();

            dto.setId(user.getId());
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());

            return dto;

        }).toList();
    }

}
