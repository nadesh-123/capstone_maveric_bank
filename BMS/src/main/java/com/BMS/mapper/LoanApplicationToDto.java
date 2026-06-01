package com.BMS.mapper;

import com.BMS.DTO.LoanAppDto;
import com.BMS.model.LoanApplication;
import org.springframework.stereotype.Component;

@Component
public class LoanApplicationToDto {
    public LoanAppDto mapToLoanAppDto(LoanApplication loanApplication){
        return new LoanAppDto(loanApplication.getId(),loanApplication.getAccount().getAccno(),loanApplication.getLoneType(),loanApplication.getLoanStatus());

    }
}
