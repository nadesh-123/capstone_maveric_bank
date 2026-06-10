package com.BMS.controller;

import com.BMS.DTO.AccountDTO;
import com.BMS.DTO.CustomerDto;
import com.BMS.DTO.LoanAppDto;
import com.BMS.enums.Status;
import com.BMS.model.Account;
import com.BMS.service.AccountService;
import com.BMS.service.CustomerService;
import com.BMS.service.EmployeeService;
import com.BMS.service.LoanApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;
    private final AccountService accountService;
    private final CustomerService customerService;
    private final LoanApplicationService loanApplicationService;
@DeleteMapping("/api/emp/close-account/{accno}")
    public void closeAccount(@PathVariable String accno){
    Account account=accountService.getAccountByAccountNumber(accno);
    employeeService.closeAccount(account);
}

    @GetMapping("/api/emp/getCustomer/{customerId}")
    public CustomerDto getCustomerId(@PathVariable int customerId){
        return employeeService.getCustomerById(customerId);
    }
    @PutMapping("/api/emp/approve/{accountid}")
    public void addEmployeeToAccount(@PathVariable String accountid, Principal principal){
    String username=principal.getName();
        employeeService.addEmployeeToAccount(username,accountid);
    }
//@GetMapping("/api/emp/pending-loan-app")
//    public List<LoanAppDto> getAllPendingLoanApp(){
//    return loanApplicationService.getPendingApp();
//}

}
