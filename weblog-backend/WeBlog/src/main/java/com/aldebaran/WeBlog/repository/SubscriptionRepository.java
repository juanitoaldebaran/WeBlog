package com.aldebaran.WeBlog.repository;

import com.aldebaran.WeBlog.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    String findSubscriptionBySubscriptionEmail(String subscriptionEmail);
}
