package com.BMS.model;

import com.BMS.enums.LoanStatus;
import com.BMS.enums.LoanType;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loanId;
    private LoanType loanType;
    private double interestRate;
    private int tenureMonths;
    private double emiAmount;
    private Instant loanStartDate;
    private Instant loanEndDate;
    @Enumerated(EnumType.STRING)
    private LoanStatus status;

    @ManyToOne
    private Account account;
}
