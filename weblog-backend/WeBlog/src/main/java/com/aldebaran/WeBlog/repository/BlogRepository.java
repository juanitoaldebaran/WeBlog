package com.aldebaran.WeBlog.repository;

import com.aldebaran.WeBlog.model.Blog;
import com.aldebaran.WeBlog.model.BlogCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByAuthorId(Long authorId);
    List<Blog> findByCategory(BlogCategory category);
    List<Blog> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String title, String content);
}