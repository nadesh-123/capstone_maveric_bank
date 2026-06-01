package com.BMS.mapper;

import com.BMS.DTO.LoanAppDto;
import com.BMS.DTO.LoanApplicationDto;
import com.BMS.model.Account;
import com.BMS.model.LoanApplication;
import com.BMS.repository.AccountRepository;
import org.springframework.stereotype.Component;

@Component
public class LoanApplicationToDto {

//    public LoanAppDto mapToLoanAppDto(LoanApplication loanApplication){
//        return new LoanAppDto(loanApplication.getId(),loanApplication.getAccount().getAccno(),loanApplication.getLoneType(),loanApplication.getLoanStatus());
//
//    }

    public LoanApplication mapDtoToLoanApplication(LoanApplicationDto loanApplicationDto, Account account){
        LoanApplication loanApplication= new LoanApplication();
        loanApplication.setLoneType(loanApplication.getLoneType());
        loanApplication.setLoanStatus(loanApplication.getLoanStatus());
        loanApplication.setPurpose(loanApplication.getPurpose());
        loanApplication.setDisbursementAccount(account);
        loanApplication.setMonthlyIncome(loanApplicationDto.monthlyIncome());
        loanApplication.setRequestedAmount(loanApplicationDto.requestedAmount());
        loanApplication.setTenureYears(5);
        return loanApplication;
    }
}
