package com.BMS.DTO;

import com.BMS.enums.LoanType;

public record LoanRequestDto(double monthlySalary,
                             LoanType loanType,
                             int tenureYears) {
}
