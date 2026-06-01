package com.BMS.model;

import com.enums.TransactionStatus;
import com.enums.TransactionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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


}
