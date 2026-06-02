package com.BMS.controller;

import com.BMS.DTO.*;
import com.BMS.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class CustomerController {
    CustomerService customerService;
    @PostMapping("/api/customer/addCustomer")
    public void createCustomer(@RequestBody UserCutomerDto userCutomerDto){

        customerService.createCustomer(userCutomerDto);
    }

//    @PostMapping("/api/customer/loan")
//    public void addLoanApplication(@RequestBody loanDto loanDto,@PathVariable int accno,@PathVariable int cusId){
//        customerService.addLoanApplication(loanDto,accno,cusId);
//    }
    @PostMapping("/api/customer/benficiary")
    public void addBenficiary(@PathVariable int accno,@RequestBody BenficiaryDto benficiaryDto){
        customerService.addBenficiary(accno,benficiaryDto);
    }
    @DeleteMapping("/api/customer/deleteBenficiary")
    public void deleteBenficiary(@PathVariable int benId){
        customerService.deleteBenficiary(benId);
    }
    @GetMapping("api/customer/getBenficiary{benId}")
    public Beneficiary getBenficiaryById(@PathVariable int benId){
        return customerService.getBenficiaryById(benId);
    }
//    @DeleteMapping("/api/customer/closeLoanApplication")
//    public void closeLoanApplication(@PathVariable int loanAppId){
//        customerService.deleteLoanApplication(loanAppId);
//    }
//    @GetMapping("/api/customer/get-loan-application/{loanAppId}")
//    public LoanAppDto getApplicationById(@PathVariable int loanAppId){
//      return   customerService.applicationById(loanAppId);
//    }
}
