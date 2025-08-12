package com.aldebaran.WeBlog.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;

public class EmailHasBeenUsedException extends RuntimeException{
    public EmailHasBeenUsedException (String message) {
        super(message);
    }
}
