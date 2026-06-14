package com.BMS.model;

import com.BMS.enums.TransactionStatus;
import com.BMS.enums.TransactionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter

public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;
    @ManyToOne
    private Account sourceAccount;
    @ManyToOne
    private Account targetAccount;
    private double amount;
    @Enumerated(EnumType.STRING)
    private TransactionStatus transactionStatus;
    @ManyToOne
Customer customer;
    @CreationTimestamp
    Instant createdAt;
}
