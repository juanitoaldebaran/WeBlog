package com.aldebaran.WeBlog.dto.response;

public class LoginResponse {
    private String jwtToken;
    private long expiresIn;
    private UserResponse user;

    public String getJwtToken() {
        return jwtToken;
    }

    public LoginResponse(String jwtToken, long expiresIn) {
        this.jwtToken = jwtToken;
        this.expiresIn = expiresIn;
    }

    public LoginResponse() {
    }

    public LoginResponse setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
        return this;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }

    public UserResponse getUser() {
        return user;
    }

    public LoginResponse setUser(UserResponse user) {
        this.user = user;
        return  this;
    }
}
