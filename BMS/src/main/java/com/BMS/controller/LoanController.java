package com.BMS.controller;

import com.BMS.DTO.EmiDto;
import com.BMS.DTO.LoanShowDto;
import com.BMS.service.LoanService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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
}
