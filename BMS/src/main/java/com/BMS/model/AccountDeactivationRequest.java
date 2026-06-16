package com.BMS.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Getter
@Setter
@Entity
public class AccountDeactivationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    private Account account;
    @CreationTimestamp
    private Instant createdAt;
    @ManyToOne
   private Employee employee;
}
