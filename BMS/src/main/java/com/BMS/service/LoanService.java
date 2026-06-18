package com.BMS.service;

import com.BMS.DTO.EmiDto;
import com.BMS.DTO.LoanShowDto;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.LoanStatus;
import com.BMS.enums.LoanType;
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

        double interestRate = getInterestRate(loanApplication.getLoneType());
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
    public static double getInterestRate(LoanType loanType) {
        switch (loanType) {
            case HOME_LOAN:
                return 8.5;

            case CAR_LOAN:
                return 9.0;

            case GOLD_LONE:
                return 10.0;

            case PERSONAL_LOAN:
                return 13.0;

            default:
                throw new IllegalArgumentException("Invalid loan type: " + loanType);
        }
    }
    public double calculateMaxLoanAmount(double monthlySalary,
                                         LoanType loanType,
                                         int tenureYears) {

        double annualInterestRate = getInterestRate(loanType);

        // Maximum EMI = 55% of salary
        double maxEmi = monthlySalary * 0.55;

        double r = annualInterestRate / (12 * 100);
        int n = tenureYears * 12;

        double factor = (Math.pow(1 + r, n) - 1) /
                (r * Math.pow(1 + r, n));

        return maxEmi * factor;
    }

}
