package com.BMS.controller;

import com.BMS.DTO.AccountDTO;
import com.BMS.DTO.AccountDtoShow;
import com.BMS.DTO.DTOAccount;
import com.BMS.enums.AccountType;
import com.BMS.enums.Status;
import com.BMS.model.Account;
import com.BMS.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/account")
@AllArgsConstructor

public class AccountController {
    AccountService accountService;
    @PostMapping("/add/customer")
    public void createAccount(@RequestParam String branchName,@RequestParam int customerId,@RequestBody DTOAccount dtoAccount){
        accountService.addAccount(dtoAccount,branchName,customerId);
    }
    @GetMapping("/get/{id}")
    public Account getAccountById(@PathVariable int id){
        return  accountService.getAccountById(id);
    }
    @GetMapping("/get/account/unapproved")
    public List<AccountDTO> getInactiveAccounts(){

        return accountService.getByStatus(Status.INACTIVE);
    }
    @PutMapping("/assignEmp/{accountid}/empid")
    public void addEmployeeToAccount(@RequestParam int empid,@PathVariable int accountid){
  accountService.addEmployeeAccount(empid,accountid);
    }

    @GetMapping("/getAccounts/{customerId}")
    public List<AccountDtoShow> getAllAccountsByCustomerId(@PathVariable int customerId){
        return accountService.getAllAccountsByCustomerId(customerId);
    }
    @PutMapping("/approve/{accNo}/{empId}")
    public void approveAccount(@PathVariable int accNo,@PathVariable int empId){
        accountService.approveAccount(accNo,empId);
    }
    @GetMapping("/api/getAccount/type")
    public List<AccountDtoShow> getAccountByType(@RequestParam AccountType accountType){
       return accountService.getAccountByType(accountType);
    }
    @DeleteMapping("/api/account/delete/{accno}")
    public void deleteAccount(@PathVariable int accno){
        accountService.closeAccount(accno);
    }

}
