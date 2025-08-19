package com.aldebaran.WeBlog.repository;

import com.aldebaran.WeBlog.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBlogId(Long blogId);
    List<Comment> findByUserId(Long userId);
}