package com.BMS.service;

import com.BMS.DTO.LoanAppDto;
import com.BMS.DTO.LoanApplicationDto;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.LoanStatus;
import com.BMS.mapper.LoanApplicationToDto;
import com.BMS.model.Account;
import com.BMS.model.LoanApplication;
import com.BMS.repository.LoanApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LoanApplicationService {
    AccountService accountService;
    LoanApplicationRepository loanApplicationRepository;
    LoanApplicationToDto loanApplicationToDto;

    public  LoanApplication findApplicationById(int applicationId) {
       return loanApplicationRepository.findById(applicationId).orElseThrow(()->new ResourceNotFoundException("invalid application id"));
    }
//    public void addApplication(LoanApplication loanApplication) {
//        loanApplicationRepository.save(loanApplication);
//    }
//public LoanAppDto getLoanApplication(int id){
//     LoanApplication loanApplication=  loanApplicationRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("invalid application id"));
//   return   loanApplicationToDto.mapToLoanAppDto(loanApplication);
//}
//    public void deleteLoanApplication(int loanAppId) {
//       LoanApplication loanApplication= loanApplicationRepository.findById(loanAppId).orElseThrow(()->new ResourceNotFoundException("invalid application id"));
//        loanApplicationRepository.delete(loanApplication);
//    }
//
//    public List<LoanAppDto> getPendingApp() {
//       List<LoanApplication> list= loanApplicationRepository.findByLoanStatus(LoanStatus.PENDING);
//       return list.stream().map(loanApplicationToDto::mapToLoanAppDto).toList();
//    }

    public void createLoanApplication(LoanApplicationDto loanApplicationDto) {
        Account account=accountService.getAccountById(loanApplicationDto.disbursementAccountId());
        System.out.println(account);
        LoanApplication loanApplication=loanApplicationToDto.mapDtoToLoanApplication(loanApplicationDto,account);
        loanApplicationRepository.save(loanApplication);
    }
}
