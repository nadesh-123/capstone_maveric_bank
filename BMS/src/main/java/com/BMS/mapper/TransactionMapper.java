package com.BMS.mapper;

import com.BMS.DTO.TransactionDtoSource;
import com.BMS.DTO.TransactionViewDto;
import com.BMS.enums.TransactionType;
import com.BMS.model.Customer;
import com.BMS.model.Transaction;
import com.BMS.service.AccountService;
import com.BMS.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class TransactionMapper {
    AccountService accountService;
    CustomerService customerService;
    public Transaction mapDtoToTransaction(TransactionDtoSource transactionDtoSource){
        Transaction transaction=new Transaction();
        transaction.setTransactionType(transactionDtoSource.transactionType());
        transaction.setAmount(transactionDtoSource.amount());
        if(transactionDtoSource.transactionType().equals(TransactionType.valueOf("DEPOSIT"))){
        transaction.setSourceAccount(null);
        transaction.setTargetAccount(accountService.getAccountByAccountNumber(transactionDtoSource.Target_accno()));
        }
        else if(transactionDtoSource.transactionType().equals(TransactionType.valueOf("WITHDRAW"))){
            transaction.setTargetAccount(null);

            transaction.setSourceAccount(accountService.getAccountByAccountNumber(transactionDtoSource.Source_accno()));
        }
        else{
            transaction.setTargetAccount(accountService.getAccountByAccountNumber(transactionDtoSource.Target_accno()));
            transaction.setSourceAccount(accountService.getAccountByAccountNumber(transactionDtoSource.Source_accno()));
        }
        return transaction;
    }
    public TransactionViewDto mapToDto(Transaction transaction, String username){
        String source=null;
        String target=null;
        Integer customerId=null;
       if(transaction.getSourceAccount()!=null){
           source=transaction.getSourceAccount().getAccountNumber();

       }
       if(transaction.getTargetAccount()!=null){
           target=transaction.getTargetAccount().getAccountNumber();
       }
       Customer customer=customerService.getByUsername(username);
       if(customer.getId()==transaction.getCustomer().getId()){
           customerId=customer.getId();
       }
        return  new TransactionViewDto(transaction.getId(),transaction.getTransactionStatus(),transaction.getTransactionType(),transaction.getCreatedAt(),transaction.getAmount(),source,target,customerId);
    }
}
