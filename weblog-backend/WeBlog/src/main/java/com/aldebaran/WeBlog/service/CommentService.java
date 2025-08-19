package com.aldebaran.WeBlog.service;

import com.aldebaran.WeBlog.model.Blog;
import com.aldebaran.WeBlog.model.Comment;
import com.aldebaran.WeBlog.model.User;
import com.aldebaran.WeBlog.repository.BlogRepository;
import com.aldebaran.WeBlog.repository.CommentRepository;
import com.aldebaran.WeBlog.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository,
                          BlogRepository blogRepository,
                          UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Comment addComment(Long blogId, Long userId, String content) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new IllegalArgumentException("Blog not found with id: " + blogId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        Comment comment = new Comment(content, blog, user);
        Comment savedComment = commentRepository.save(comment);

        blog.incrementCommentCount();
        blogRepository.save(blog);

        return savedComment;
    }

    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found with id: " + commentId));

        Blog blog = comment.getBlog();
        blog.decrementCommentCount();
        blogRepository.save(blog);

        commentRepository.delete(comment);
    }

    public List<Comment> getCommentsByBlog(Long blogId) {
        return commentRepository.findByBlogId(blogId);
    }

    public List<Comment> getCommentsByUser(Long userId) {
        return commentRepository.findByUserId(userId);
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }
}
