package com.aldebaran.WeBlog.service;

import com.aldebaran.WeBlog.model.Blog;
import com.aldebaran.WeBlog.model.BlogCategory;
import com.aldebaran.WeBlog.repository.BlogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }

    // Add method to get blogs by author
    public List<Blog> getBlogsByAuthor(Long authorId) {
        return blogRepository.findByAuthorId(authorId);
    }

    // Add method to get blogs by category
    public List<Blog> getBlogsByCategory(BlogCategory category) {
        return blogRepository.findByCategory(category);
    }

    // Add method to search blogs by title or content
    public List<Blog> searchBlogs(String keyword) {
        return blogRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(keyword, keyword);
    }
}