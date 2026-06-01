package com.BMS.model;

import com.BMS.enums.LoanStatus;
import com.BMS.enums.LoanType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    private Account disbursementAccount;
    @Enumerated(EnumType.STRING)
    private LoanType loneType;
    private double requestedAmount;
    private int tenureYears;
    private String purpose;
    private double monthlyIncome;
    @Enumerated(EnumType.STRING)
    private LoanStatus loanStatus;
    @CreationTimestamp
    private Instant application_date;
    @ManyToOne
    private Employee employee;
}