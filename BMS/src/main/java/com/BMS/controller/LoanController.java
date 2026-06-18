package com.BMS.controller;

import com.BMS.DTO.EmiDto;
import com.BMS.DTO.LoanMaximumAmountDto;

import com.BMS.DTO.LoanRequestDto;
import com.BMS.DTO.LoanShowDto;
import com.BMS.service.LoanService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
public class LoanController {
    private final LoanService loanService;
    @GetMapping("/api/loan/calculate-emi/{applicationId}")
    public EmiDto calculateEmi(@PathVariable int applicationId){
       return loanService.calculateMonthlyEmi(applicationId);
    }
    @GetMapping("/api/loan/getAll")
    public List<LoanShowDto> getAllLoans(Principal principal){
        String username=principal.getName();
        return  loanService.getAllLoans(username);
    }
    @PostMapping("/api/loan/max-amount")
    public ResponseEntity<LoanMaximumAmountDto> calculateMaximumLoanAmount(
            @RequestBody LoanRequestDto requestDto) {

        double amount = loanService.calculateMaxLoanAmount(
                requestDto.monthlySalary(),
                requestDto.loanType(),
                requestDto.tenureYears()
        );

        LoanMaximumAmountDto responseDto = new LoanMaximumAmountDto(amount);

        return ResponseEntity.ok(responseDto);
    }
}
