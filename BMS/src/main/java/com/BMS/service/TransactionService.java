package com.BMS.service;

import com.BMS.DTO.TransactionDtoSource;
import com.BMS.DTO.TransactionViewDto;
import com.BMS.DTO.TransactionViewDtoV2;
import com.BMS.Exception.InsufficiantBalanceException;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.TransactionStatus;
import com.BMS.enums.TransactionType;
import com.BMS.mapper.TransactionMapper;
import com.BMS.model.Customer;
import com.BMS.model.Transaction;
import com.BMS.model.User;
import com.BMS.repository.TransactionRepository;
import com.BMS.utility.TransactionSpecification;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@AllArgsConstructor
public class TransactionService {
    TransactionMapper transactionMapper;
    private final TransactionRepository transactionRepository;
    private final UserService userService;

  private final CustomerService customerService;
    public void withdrawDepositCombine(TransactionDtoSource transactionDtoSource, String username) {
        Transaction transaction=transactionMapper.mapDtoToTransaction(transactionDtoSource);

        transaction.setCustomer(customerService.getByUsername(username));
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
        Customer customer=customerService.getByUsername(username);

       List<Transaction> list= transactionRepository.getAllTransactions(customer.getId(),pageable).getContent();
      return list.stream().map(transaction ->transactionMapper.mapToDto(transaction,username) ).toList();
    }

    public TransactionViewDtoV2 transactionFilter(String username, int page, int size) {
        Customer customer=customerService.getByUsername(username);
        Pageable pageable= PageRequest.of(page,size);
        Page<Transaction> pages= transactionRepository.getAllTransactions(customer.getId(),pageable);
       List<TransactionViewDto> list2= pages.getContent().stream().map(transaction ->transactionMapper.mapToDto(transaction,username) ).toList();
        long totalElements =  pages.getTotalElements();
        int totalPages = pages.getTotalPages();
       return new TransactionViewDtoV2(totalElements,totalPages,list2);
    }

    public TransactionViewDtoV2 transactionFilter(
            String username,
            TransactionStatus status,
            TransactionType type,
            String sourceAccount,
            String targetAccount,
            Double minAmount,
            Double maxAmount,
            String startDate,
            String endDate,
            int page,
            int size
    ) {

        Customer customer = customerService.getByUsername(username);

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by("createdAt").descending()
                );

        Instant start = null;
        Instant end = null;

        if (startDate != null && !startDate.isBlank()) {
            start = Instant.parse(startDate);
        }


        if(endDate != null && !endDate.isBlank()){

            end = Instant.parse(endDate)
                    .plus(1, ChronoUnit.DAYS);
        }

        Specification<Transaction> specification =
                TransactionSpecification.filter(
                        customer.getId(),
                        status,
                        type,
                        sourceAccount,
                        targetAccount,
                        minAmount,
                        maxAmount,
                        start,
                        end
                );

        Page<Transaction> pages =
                transactionRepository.findAll(
                        specification,
                        pageable
                );

        List<TransactionViewDto> list =
                pages.getContent()
                        .stream()
                        .map(transaction ->
                                transactionMapper.mapToDto(
                                        transaction,
                                        username
                                ))
                        .toList();

        return new TransactionViewDtoV2(
                pages.getTotalElements(),
                pages.getTotalPages(),
                list
        );
    }


    public long getTotalTransactions() {
      return   transactionRepository.getTotalCount();
    }
}
