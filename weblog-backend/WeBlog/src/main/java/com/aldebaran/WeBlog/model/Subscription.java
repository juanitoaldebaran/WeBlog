package com.aldebaran.WeBlog.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table (name = "subscription_table")
public class Subscription {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;

    @Column (name = "subscription_email")
    private String subscriptionEmail;

    @Column (name = "subscribed_at")
    private Date subscribedAt;

    public Subscription(Long id, String subscriptionEmail, Date subscribedAt) {
        this.id = id;
        this.subscriptionEmail = subscriptionEmail;
        this.subscribedAt = subscribedAt;
    }

    public Subscription() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubscriptionEmail() {
        return subscriptionEmail;
    }

    public void setSubscriptionEmail(String subscriptionEmail) {
        this.subscriptionEmail = subscriptionEmail;
    }

    public Date getSubscribedAt() {
        return subscribedAt;
    }

    public void setSubscribedAt(Date subscribedAt) {
        this.subscribedAt = subscribedAt;
    }
}
