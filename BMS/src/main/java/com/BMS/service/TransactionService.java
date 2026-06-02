package com.BMS.service;

import com.BMS.DTO.TransactionDtoSource;
import com.BMS.DTO.TransactionViewDto;
import com.BMS.Exception.InsufficiantBalanceException;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.TransactionStatus;
import com.BMS.mapper.TransactionMapper;
import com.BMS.model.Transaction;
import com.BMS.model.User;
import com.BMS.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TransactionService {
    TransactionMapper transactionMapper;
    TransactionRepository transactionRepository;
    UserService userService;


    public void withdrawDepositCombine(TransactionDtoSource transactionDtoSource, String username) {
        Transaction transaction=transactionMapper.mapDtoToTransaction(transactionDtoSource);

        transaction.setUser(userService.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("invalid user")));
        try{
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
     transactionRepository.save(transaction);}
        catch(JpaSystemException e){
            transaction.setTransactionStatus(TransactionStatus.FAILURE);
            transactionRepository.save(transaction);
            throw new InsufficiantBalanceException("Insufficient Balance");
        }
    }

    public List<TransactionViewDto> getTransactions(String username, int page, int size) {
        Pageable pageable= PageRequest.of(page,size);
      User user=  userService.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("invalid user"));
       List<Transaction> list= transactionRepository.findByUserId(user.getId());
      return list.stream().map(transaction ->transactionMapper.mapToDto(transaction) ).toList();
    }
}
