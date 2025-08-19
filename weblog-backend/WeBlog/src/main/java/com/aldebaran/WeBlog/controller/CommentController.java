package com.aldebaran.WeBlog.controller;

import com.aldebaran.WeBlog.dto.request.CommentRequest;
import com.aldebaran.WeBlog.model.Comment;
import com.aldebaran.WeBlog.model.User;
import com.aldebaran.WeBlog.repository.UserRepository;
import com.aldebaran.WeBlog.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/comment")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CommentController {

    private final CommentService commentService;
    private final UserRepository userRepository;

    public CommentController(CommentService commentService, UserRepository userRepository) {
        this.commentService = commentService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        return ResponseEntity.ok(commentService.getAllComments());
    }

    @PostMapping("/blog/{blogId}")
    public ResponseEntity<?> addCommentToSpecificBlog(
            @PathVariable Long blogId,
            @RequestBody Map<String, String> request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();

            User currentUser = userRepository.findUserByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String content = request.get("content");
            Comment comment = commentService.addComment(blogId, currentUser.getId(), content);
            return ResponseEntity.ok(comment);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating comment: " + e.getMessage());
        }
    }

    @GetMapping("/blog/{blogId}")
    public ResponseEntity<List<Comment>> getCommentsByBlog(@PathVariable Long blogId) {
        return ResponseEntity.ok(commentService.getCommentsByBlog(blogId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Comment>> getCommentsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(commentService.getCommentsByUser(userId));
    }

    @GetMapping("/my-comments")
    public ResponseEntity<?> getMyComments() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();

            User currentUser = userRepository.findUserByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Comment> comments = commentService.getCommentsByUser(currentUser.getId());
            return ResponseEntity.ok(comments);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting comments: " + e.getMessage());
        }
    }
}