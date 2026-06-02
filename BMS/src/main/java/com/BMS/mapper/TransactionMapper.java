package com.BMS.mapper;

import com.BMS.DTO.TransactionDtoSource;
import com.BMS.DTO.TransactionViewDto;
import com.BMS.enums.TransactionStatus;
import com.BMS.enums.TransactionType;
import com.BMS.model.Transaction;
import com.BMS.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class TransactionMapper {
    AccountService accountService;
    public Transaction mapDtoToTransaction(TransactionDtoSource transactionDtoSource){
        Transaction transaction=new Transaction();
        transaction.setTransactionType(transactionDtoSource.transactionType());
        transaction.setAmount(transactionDtoSource.amount());
        if(transactionDtoSource.transactionType().equals(TransactionType.valueOf("DEPOSIT"))){
        transaction.setSourceAccount(null);
        transaction.setTargetAccount(accountService.getAccountById(transactionDtoSource.Target_accno()));
        }
        else if(transactionDtoSource.transactionType().equals(TransactionType.valueOf("WITHDRAW"))){
            transaction.setTargetAccount(null);

            transaction.setSourceAccount(accountService.getAccountById(transactionDtoSource.Source_accno()));
        }
        else{
            transaction.setTargetAccount(accountService.getAccountById(transactionDtoSource.Target_accno()));
            transaction.setSourceAccount(accountService.getAccountById(transactionDtoSource.Source_accno()));
        }
        return transaction;
    }
    public TransactionViewDto mapToDto(Transaction transaction){
        return  new TransactionViewDto(transaction.getId(),transaction.getTransactionStatus());
    }
}
