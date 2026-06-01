package com.BMS.service;

import com.BMS.DTO.EmiDto;
import com.BMS.model.LoanApplication;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
@AllArgsConstructor
public class LoanService {
    LoanApplicationService loanApplicationService;
    public EmiDto calculateMonthlyEmi(int applicationId) {
        LoanApplication loanApplication = loanApplicationService.findApplicationById(applicationId);

        double loanAmount = loanApplication.getRequestedAmount();
        int years = loanApplication.getTenureYears();

        // Prevent division by zero or invalid calculations
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
}
