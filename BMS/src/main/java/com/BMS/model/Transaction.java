package com.BMS.model;

import com.enums.TransactionStatus;
import com.enums.TransactionType;
import jakarta.persistence.*;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    private Account account;
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;
    private double amount;
    @Enumerated(EnumType.STRING)
    private TransactionStatus transactionStatus;

    public int getId() {
        return id;
    }

    public Account getAccount() {
        return account;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public double getAmount() {
        return amount;
    }

    public TransactionStatus getTransactionStatus() {
        return transactionStatus;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", account=" + account +
                ", transactionType=" + transactionType +
                ", amount=" + amount +
                ", transactionStatus=" + transactionStatus +
                '}';
    }
}
