package com.aldebaran.WeBlog.controller;

import com.aldebaran.WeBlog.model.Blog;
import com.aldebaran.WeBlog.model.User;
import com.aldebaran.WeBlog.repository.UserRepository;
import com.aldebaran.WeBlog.service.BlogService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blog")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class BlogController {

    private final BlogService blogService;
    private final UserRepository userRepository;

    public BlogController(BlogService blogService, UserRepository userRepository) {
        this.blogService = blogService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> createBlog(@RequestBody Blog blog) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();

            User currentUser = userRepository.findUserByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));


            blog.setAuthor(currentUser);
            blog.setViews(0);
            blog.setCommentCount(0);

            Blog savedBlog = blogService.createBlog(blog);
            return ResponseEntity.ok(savedBlog);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error creating blog: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable Long id) {
        try {
            return blogService.getBlogById(id)
                    .map(blog -> {
                        // Increment view count when blog is fetched
                        blog.setViews(blog.getViews() + 1);
                        blogService.createBlog(blog); // Save the updated view count
                        return ResponseEntity.ok(blog);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching blog: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable Long id, @RequestBody Blog blogDetails) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();

            return blogService.getBlogById(id).map(existingBlog -> {
                if (!existingBlog.getAuthor().getEmail().equals(userEmail)) {
                    return ResponseEntity.status(403).body("You can only edit your own blogs");
                }

                existingBlog.setTitle(blogDetails.getTitle());
                existingBlog.setContent(blogDetails.getContent());
                existingBlog.setCategory(blogDetails.getCategory());
                existingBlog.setImageUrl(blogDetails.getImageUrl());
                existingBlog.setDescription(blogDetails.getDescription());

                return ResponseEntity.ok(blogService.createBlog(existingBlog));
            }).orElse(ResponseEntity.notFound().build());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating blog: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable Long id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();

            return blogService.getBlogById(id).map(existingBlog -> {
                if (!existingBlog.getAuthor().getEmail().equals(userEmail)) {
                    return ResponseEntity.status(403).body("You can only delete your own blogs");
                }

                blogService.deleteBlog(id);
                return ResponseEntity.noContent().build();
            }).orElse(ResponseEntity.notFound().build());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting blog: " + e.getMessage());
        }
    }

    // Add endpoint to get blogs by current user
    @GetMapping("/my-blogs")
    public ResponseEntity<?> getMyBlogs() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();

            User currentUser = userRepository.findUserByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Blog> userBlogs = blogService.getBlogsByAuthor(currentUser.getId());
            return ResponseEntity.ok(userBlogs);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching user blogs: " + e.getMessage());
        }
    }
}