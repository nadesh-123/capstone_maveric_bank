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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/account")
@AllArgsConstructor

public class AccountController {
   private final AccountService accountService;
    @PostMapping("/add/Account")
    public void createAccount( @RequestParam("files") MultipartFile[] files, @ModelAttribute DTOAccount dtoAccount, Principal principal) throws IOException {
        String username=principal.getName();
        accountService.addAccount(dtoAccount,username,files);
    }
//    @GetMapping("/get/{id}")
//    public Account getAccountById(@PathVariable int id){
//        return  accountService.getAccountById(id);
//    }


//for Customer
    @GetMapping("/getAccounts")
    public List<AccountDtoShow> getAllAccountsByCustomerId(Principal principal){
        String username=principal.getName();
        return accountService.getAllAccountsByUsername(username);
    }
    @GetMapping("/getActiveAccounts")
    public List<AccountDtoShow> getAllActiveAccountsByCustomerId(Principal principal){
        String username=principal.getName();
        return accountService.getAllActiveAccountsByUsername(username);
    }
    //For Employee
    @GetMapping("/unapproved")
    public List<AccountDTO> getInactiveAccounts(@RequestParam(defaultValue = "0",required = false) int page,@RequestParam(defaultValue = "10",required = false) int size ){

        return accountService.getByStatus(Status.INACTIVE,page,size);
    }

    @GetMapping("/api/getAccount/type")
    public List<AccountDtoShow> getAccountByType(@RequestParam AccountType accountType){
       return accountService.getAccountByType(accountType);
    }
//    @DeleteMapping("/api/account/delete/{accno}")
//    public void deleteAccount(@PathVariable int accno){
//
//        accountService.closeAccount(accno);
//    }


}
