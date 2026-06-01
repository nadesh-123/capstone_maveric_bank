package com.BMS.service;

import com.BMS.DTO.LoanAppDto;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.LoanStatus;
import com.BMS.mapper.LoanApplicationToDto;
import com.BMS.model.LoanApplication;
import com.BMS.repository.LoanApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LoanApplicationService {
    LoanApplicationRepository loanApplicationRepository;
    LoanApplicationToDto loanApplicationToDto;
    public void addApplication(LoanApplication loanApplication) {
        loanApplicationRepository.save(loanApplication);
    }
public LoanAppDto getLoanApplication(int id){
     LoanApplication loanApplication=  loanApplicationRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("invalid application id"));
   return   loanApplicationToDto.mapToLoanAppDto(loanApplication);
}
    public void deleteLoanApplication(int loanAppId) {
       LoanApplication loanApplication= loanApplicationRepository.findById(loanAppId).orElseThrow(()->new ResourceNotFoundException("invalid application id"));
        loanApplicationRepository.delete(loanApplication);
    }

    public List<LoanAppDto> getPendingApp() {
       List<LoanApplication> list= loanApplicationRepository.findByLoanStatus(LoanStatus.PENDING);
       return list.stream().map(loanApplicationToDto::mapToLoanAppDto).toList();
    }
}
