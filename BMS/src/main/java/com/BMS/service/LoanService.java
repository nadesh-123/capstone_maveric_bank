package com.BMS.service;

import com.BMS.DTO.EmiDto;
import com.BMS.DTO.LoanShowDto;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.LoanStatus;
import com.BMS.mapper.LoanMapper;
import com.BMS.model.Loan;
import com.BMS.model.LoanApplication;
import com.BMS.repository.LoanApplicationRepository;
import com.BMS.repository.LoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@AllArgsConstructor
public class LoanService {
    private final  LoanRepository loanRepository;
    LoanMapper loanMapper;
    private final LoanApplicationRepository loanApplicationRepository;
    public EmiDto calculateMonthlyEmi(int applicationId) {
        LoanApplication loanApplication = loanApplicationRepository.findById(applicationId).orElseThrow(()->new ResourceNotFoundException("invalid applicationId"));

        double loanAmount = loanApplication.getRequestedAmount();
        int years = loanApplication.getTenureYears();


        if (years <= 0 || loanAmount <= 0) {
            return new EmiDto(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP));
        }

        double interestRate = 12;
        double monthlyRate = interestRate / (12 * 100);
        int totalMonths = years * 12;

        double emiAmount = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
                / (Math.pow(1 + monthlyRate, totalMonths) - 1);

        return new EmiDto(BigDecimal.valueOf(emiAmount).setScale(2, RoundingMode.HALF_UP));
    }


    public List<LoanShowDto> getAllLoans(String username) {
        List<Loan> list=loanRepository.findByAccountCustomerUserUsername(username);
        return list.stream().map(loanMapper::mapLoanToDto).toList();
    }
}
