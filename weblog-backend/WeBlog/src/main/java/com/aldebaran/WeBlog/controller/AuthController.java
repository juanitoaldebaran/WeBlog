package com.aldebaran.WeBlog.controller;

import com.aldebaran.WeBlog.dto.request.LoginRequest;
import com.aldebaran.WeBlog.dto.request.RegisterRequest;
import com.aldebaran.WeBlog.dto.response.LoginResponse;
import com.aldebaran.WeBlog.dto.response.UserResponse;
import com.aldebaran.WeBlog.exception.EmailHasBeenUsedException;
import com.aldebaran.WeBlog.model.User;
import com.aldebaran.WeBlog.repository.UserRepository;
import com.aldebaran.WeBlog.service.AuthService;
import com.aldebaran.WeBlog.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Autowired
    public AuthController(AuthService authService, JwtService jwtService, UserRepository userRepository) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            User newUser = authService.registerUser(registerRequest);

            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (EmailHasBeenUsedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        User loginUser = authService.loginUser(loginRequest);

        String jwtTokenResponse = jwtService.generateToken(loginUser);

        UserResponse userResponse = new UserResponse(loginUser);

        LoginResponse loginResponse = new LoginResponse()
                .setJwtToken(jwtTokenResponse)
                .setExpiresIn(jwtService.getExpiresIn())
                .setUser(userResponse);

        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }
}
