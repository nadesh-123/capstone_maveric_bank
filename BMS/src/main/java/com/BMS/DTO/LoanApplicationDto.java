package com.BMS.DTO;

import com.BMS.enums.LoanStatus;
import com.BMS.enums.LoanType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

public record LoanApplicationDto(
        int id,
        @NotNull
        String disbursementAccount,  // reference to Account entity
      @Enumerated(EnumType.STRING)
        LoanType loanType,
        @NotBlank
        double requestedAmount,
        @NotNull
        int tenureYears,
        @NotBlank
        @NotNull
        String purpose,
        @NotNull
        double monthlyIncome,
        LoanStatus loanStatus,
        @CreationTimestamp
        Instant applicationDate

){}

