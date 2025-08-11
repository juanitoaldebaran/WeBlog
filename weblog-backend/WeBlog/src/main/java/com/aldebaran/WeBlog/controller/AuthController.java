package com.aldebaran.WeBlog.controller;

import com.aldebaran.WeBlog.dto.request.LoginRequest;
import com.aldebaran.WeBlog.dto.request.RegisterRequest;
import com.aldebaran.WeBlog.dto.response.LoginResponse;
import com.aldebaran.WeBlog.model.User;
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

    @Autowired
    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        User newUser = authService.registerUser(registerRequest);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        User loginUser = authService.loginUser(loginRequest);

        String jwtTokenResponse = jwtService.generateToken(loginUser);

        LoginResponse loginResponse = new LoginResponse().setJwtToken(jwtTokenResponse).setExpiresIn(jwtService.getExpiresIn());

        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }
}
