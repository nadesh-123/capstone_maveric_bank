package com.BMS.DTO;

import com.BMS.enums.LoanType;

import java.time.Instant;

public record LoanShowDto(
        LoanType loanType,
        int tenureYears,
        double emiAmount,
        double loanAmount

) {
}
