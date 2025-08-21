package com.aldebaran.WeBlog.controller;

import com.aldebaran.WeBlog.dto.response.UserResponse;
import com.aldebaran.WeBlog.dto.response.UserStatsResponse;
import com.aldebaran.WeBlog.model.User;
import com.aldebaran.WeBlog.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getCurrentUserProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();

            User currentUser = userRepository.findUserByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserResponse userResponse = new UserResponse(currentUser);
            return ResponseEntity.ok(userResponse);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching user profile: " + e.getMessage());
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody User userDetails) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();

            User currentUser = userRepository.findUserByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            currentUser.setFirstName(userDetails.getFirstName());
            currentUser.setLastName(userDetails.getLastName());

            User updatedUser = userRepository.save(currentUser);
            UserResponse userResponse = new UserResponse(updatedUser);
            return ResponseEntity.ok(userResponse);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating user profile: " + e.getMessage());
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getUserStats() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }

            String userEmail = authentication.getName();
            System.out.println("DEBUG: User email from token: " + userEmail);

            User currentUser = userRepository.findUserByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

            int totalBlogs = currentUser.getBlogs().size();
            int totalComments = currentUser.getComments().size();
            int totalViews = currentUser.getBlogs().stream()
                    .mapToInt(blog -> blog.getViews() != null ? blog.getViews() : 0)
                    .sum();

            UserStatsResponse stats = new UserStatsResponse(totalBlogs, totalComments, totalViews);
            System.out.println("DEBUG: User stats calculated successfully");
            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            System.err.println("ERROR in getUserStats: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching user stats: " + e.getMessage());
        }
    }

}