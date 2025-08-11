package com.aldebaran.WeBlog.service;

import com.aldebaran.WeBlog.dto.request.LoginRequest;
import com.aldebaran.WeBlog.dto.request.RegisterRequest;
import com.aldebaran.WeBlog.model.User;
import com.aldebaran.WeBlog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    @Autowired
    public AuthService(PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    public User registerUser(RegisterRequest registerRequest) {
        User newUser = new User()
                .setFirstName(registerRequest.getFirstName())
                .setLastName(registerRequest.getLastName())
                .setEmail(registerRequest.getEmail())
                .setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        return newUser;
    }

    public User loginUser(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        ));

        return userRepository.findUserByEmail(loginRequest.getEmail()).orElseThrow(() -> new RuntimeException("User Not Found"));
    }
}
