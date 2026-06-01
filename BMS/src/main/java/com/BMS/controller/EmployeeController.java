package com.BMS.controller;

import com.BMS.DTO.LoanAppDto;
import com.BMS.model.Account;
import com.BMS.service.AccountService;
import com.BMS.service.EmployeeService;
import com.BMS.service.LoanApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class EmployeeController {
    EmployeeService employeeService;
    AccountService accountService;
    LoanApplicationService loanApplicationService;
@DeleteMapping("/api/emp/close-account/{accno}")
    public void closeAccount(@PathVariable int accno){
    Account account=accountService.getAccountById(accno);
    employeeService.closeAccount(account);
}
@GetMapping("/api/emp/pending-loan-app")
    public List<LoanAppDto> getAllPendingLoanApp(){
    return loanApplicationService.getPendingApp();
}

}
