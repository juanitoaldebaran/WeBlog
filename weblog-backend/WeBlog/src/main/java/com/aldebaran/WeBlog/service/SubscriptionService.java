package com.aldebaran.WeBlog.service;

import com.aldebaran.WeBlog.model.Subscription;
import com.aldebaran.WeBlog.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;

    @Autowired
    public SubscriptionService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public List<Subscription> getAllSubscriptions() {
        List<Subscription> userList = subscriptionRepository.findAll();

        return userList;
    }

    public String findSubscriptionBySubscriptionEmail(String subscriptionEmail) {
        return subscriptionRepository.findSubscriptionBySubscriptionEmail(subscriptionEmail);
    }
}
