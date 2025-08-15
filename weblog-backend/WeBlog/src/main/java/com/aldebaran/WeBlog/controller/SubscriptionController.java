package com.aldebaran.WeBlog.controller;

import com.aldebaran.WeBlog.model.Subscription;
import com.aldebaran.WeBlog.service.SubscriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/subscription")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/{subscriptionEmail}")
    public ResponseEntity<Subscription> getSubscriptionByEmail(@PathVariable String subscriptionEmail) {
        String subscription = subscriptionService.findSubscriptionBySubscriptionEmail(subscriptionEmail);

        return new ResponseEntity(subscription, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Subscription>> findAllSubscriptionEmail() {
        return new ResponseEntity<>(subscriptionService.getAllSubscriptions(), HttpStatus.OK);
    }
}
