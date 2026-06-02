package com.BMS.mapper;

import com.BMS.DTO.LoanAppDto;
import com.BMS.DTO.LoanApplicationDto;
import com.BMS.enums.LoanStatus;
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

    public LoanApplication mapDtoToLoanApplication(LoanApplicationDto loanApplicationDto, Account account) {
        LoanApplication loanApplication = new LoanApplication();
        loanApplication.setLoneType(loanApplicationDto.loanType());

        loanApplication.setPurpose(loanApplicationDto.purpose());
        loanApplication.setDisbursementAccount(account);
        loanApplication.setLoanStatus(LoanStatus.PENDING);
        loanApplication.setMonthlyIncome(loanApplicationDto.monthlyIncome());
        loanApplication.setRequestedAmount(loanApplicationDto.requestedAmount());
        loanApplication.setTenureYears(loanApplicationDto.tenureYears());
        return loanApplication;

    }
    public LoanApplicationDto mapLoanApplicationToDto(LoanApplication loanApplication){
        return  new LoanApplicationDto(loanApplication.getDisbursementAccount().getAccno(),loanApplication.getLoneType(),loanApplication.getRequestedAmount(),loanApplication.getTenureYears(),loanApplication.getPurpose(),loanApplication.getMonthlyIncome(),LoanStatus.PENDING,loanApplication.getApplication_date());
    }
}