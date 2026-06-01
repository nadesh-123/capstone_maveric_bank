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
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Enumerated(EnumType.STRING)

    private LoanType loneType;

    @Enumerated(EnumType.STRING)

    private LoanStatus loanStatus;

    @CreationTimestamp
    private Instant application_date;
}