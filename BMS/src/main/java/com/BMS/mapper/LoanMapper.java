package com.BMS.mapper;

import com.BMS.DTO.LoanShowDto;
import com.BMS.model.Loan;
import org.springframework.stereotype.Component;

@Component
public class LoanMapper {
    public LoanShowDto mapLoanToDto(Loan loan){
        return new LoanShowDto(loan.getLoanType(),loan.getTenureYears(),loan.getLoanAmount(), loan.getEmiAmount());
    }
}
