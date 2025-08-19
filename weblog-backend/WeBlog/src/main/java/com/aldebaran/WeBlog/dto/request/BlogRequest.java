package com.aldebaran.WeBlog.dto.request;

import com.aldebaran.WeBlog.model.BlogCategory;
import org.antlr.v4.runtime.misc.NotNull;

public class BlogRequest {

    private String title;
    private String content;
    private BlogCategory category;
    private String imageUrl;
    private String description;
    private Long authorId;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public BlogCategory getCategory() { return category; }
    public void setCategory(BlogCategory category) { this.category = category; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getAuthorId() { return authorId; }
    public void setAuthorId(Long authorId) { this.authorId = authorId; }
}
