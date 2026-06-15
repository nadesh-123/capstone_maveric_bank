package com.BMS.controller;

import com.BMS.DTO.TransactionDtoSource;
import com.BMS.DTO.TransactionViewDto;
import com.BMS.DTO.TransactionViewDtoV2;
import com.BMS.enums.TransactionStatus;
import com.BMS.enums.TransactionType;
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
    public List<TransactionViewDto> getTransactions(Principal principal, @RequestParam(defaultValue = "0",required = false) int page,@RequestParam(defaultValue = "15",required = false) int size){
        String username=principal.getName();
       return transactionService.getTransactions(username,page,size);
    }
    @GetMapping("/api/transaction/filter")
    public TransactionViewDtoV2 transactionFilter(
            Principal principal,

            @RequestParam(required = false)
            TransactionStatus status,

            @RequestParam(required = false)
            TransactionType type,

            @RequestParam(required = false)
            String sourceAccount,

            @RequestParam(required = false)
            String targetAccount,

            @RequestParam(required = false)
            Double minAmount,

            @RequestParam(required = false)
            Double maxAmount,

            @RequestParam(required = false)
            String startDate,

            @RequestParam(required = false)
            String endDate,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "15")
            int size
    ) {

        return transactionService.transactionFilter(
                principal.getName(),
                status,
                type,
                sourceAccount,
                targetAccount,
                minAmount,
                maxAmount,
                startDate,
                endDate,
                page,
                size
        );
    }
}
