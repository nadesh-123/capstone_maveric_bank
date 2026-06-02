package com.BMS.DTO;

import com.BMS.enums.LoanStatus;
import com.BMS.enums.LoanType;

import java.time.Instant;

public record LoanApplicationDto(

        int disbursementAccountId, // reference to Account entity
        LoanType loanType,
        double requestedAmount,
        int tenureYears,
        String purpose,
        double monthlyIncome,
       LoanStatus loanStatus,
        Instant applicationDate

) {}

