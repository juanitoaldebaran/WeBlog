package com.aldebaran.WeBlog.dto.response;

import com.aldebaran.WeBlog.model.User;

import java.util.Date;

public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Date issuedAt;
    private Date updatedAt;

    public UserResponse() {}

    public UserResponse(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.issuedAt = user.getIssuedAt();
        this.updatedAt = user.getUpdatedAt();
    }

    public Long getId() {
        return id;
    }

    public UserResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public UserResponse setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public UserResponse setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public UserResponse setEmail(String email) {
        this.email = email;
        return this;
    }

    public Date getIssuedAt() {
        return issuedAt;
    }

    public UserResponse setIssuedAt(Date issuedAt) {
        this.issuedAt = issuedAt;
        return this;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public UserResponse setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

}
