package com.BMS.controller;

import com.BMS.DTO.EmiDto;
import com.BMS.service.LoanService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class LoanController {
    LoanService loanService;
    @GetMapping("/api/loan/calculate-emi/{applicationId}")
    public EmiDto calculateEmi(@PathVariable int applicationId){
       return loanService.calculateMonthlyEmi(applicationId);
    }
}
