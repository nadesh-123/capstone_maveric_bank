package com.BMS.controller;

import com.BMS.DTO.TransactionDtoSource;
import com.BMS.DTO.TransactionViewDto;
import com.BMS.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor

public class TransactionController {
    private final  TransactionService transactionService;
    @PostMapping("/api/transaction-Withdraw-Deposit-Transfer")
    public void withdrawDepositCombine(@RequestBody TransactionDtoSource transactionDtoSource,Principal principal){
        String username=principal.getName();
        transactionService.withdrawDepositCombine(transactionDtoSource,username);
    }
    @GetMapping("/api/transaction/get-transactions")
    public List<TransactionViewDto> getTransactions(Principal principal, @RequestParam int page,@RequestParam int size){
        String username=principal.getName();
       return transactionService.getTransactions(username,page,size);
    }

}
