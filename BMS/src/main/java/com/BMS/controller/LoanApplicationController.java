package com.BMS.controller;

import com.BMS.DTO.LoanApplicationDto;
import com.BMS.service.LoanApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor

public class LoanApplicationController {
    LoanApplicationService loanApplicationService;
    @PostMapping("/api/loan-application/apply")
    public void createLoanApplication(@RequestBody  LoanApplicationDto loanApplicationDto){
        try{
        loanApplicationService.createLoanApplication(loanApplicationDto);}
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
