package com.BMS.controller;

import com.BMS.DTO.*;
import com.BMS.model.Beneficiary;
import com.BMS.service.CustomerService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    @PostMapping("/api/customer/addCustomer")
    public CustomerDto createCustomer(@Valid  @RequestBody UserCutomerDto userCutomerDto){

        return customerService.createCustomer(userCutomerDto);
    }
     @GetMapping("/api/customer/getAllActiveCustomer")
    public PaginatedCustomers getAllActiveCustomer(@RequestParam(required = false,defaultValue = "0") int page,@RequestParam(required = false,defaultValue = "5") int size){
        return customerService.getAllCustomers(page,size);
     }

//    @DeleteMapping("/api/customer/deleteBeneficiary")
//    public void deleteBeneficiary(@PathVariable int benId){
//        customerService.deleteBenficiary(benId);
//    }
//    @GetMapping("api/customer/getBeneficiary{benId}")
//    public Beneficiary getBeneficiaryById(@PathVariable int benId){
//        return customerService.getBenficiaryById(benId);
//    }
//    @DeleteMapping("/api/customer/closeLoanApplication")
//    public void closeLoanApplication(@PathVariable int loanAppId){
//        customerService.deleteLoanApplication(loanAppId);
//    }
//    @GetMapping("/api/customer/get-loan-application/{loanAppId}")
//    public LoanAppDto getApplicationById(@PathVariable int loanAppId){
//      return   customerService.applicationById(loanAppId);
//    }
}
