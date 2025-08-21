package com.aldebaran.WeBlog.dto.response;

public class UserStatsResponse {
    private int totalBlogs;
    private int totalComments;
    private int totalViews;

    public UserStatsResponse(int totalBlogs, int totalComments, int totalViews) {
        this.totalBlogs = totalBlogs;
        this.totalComments = totalComments;
        this.totalViews = totalViews;
    }

    public int getTotalBlogs() { return totalBlogs; }
    public void setTotalBlogs(int totalBlogs) { this.totalBlogs = totalBlogs; }

    public int getTotalComments() { return totalComments; }
    public void setTotalComments(int totalComments) { this.totalComments = totalComments; }

    public int getTotalViews() { return totalViews; }
    public void setTotalViews(int totalViews) { this.totalViews = totalViews; }
}
