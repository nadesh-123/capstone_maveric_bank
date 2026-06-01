package com.BMS.DTO;

import com.BMS.enums.LoanStatus;
import com.BMS.enums.LoanType;

public record LoanAppDto(int id,
                         int accno,
                         LoanType loanType,
                         LoanStatus loanStatus) {
}
