package com.BMS.service;

import com.BMS.DTO.AccountDTO;
import com.BMS.DTO.AccountDtoShow;
import com.BMS.DTO.DTOAccount;
import com.BMS.DTO.UserDtoNoPassword;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.AccountType;
import com.BMS.enums.Status;
import com.BMS.mapper.MapAccountDto;
import com.BMS.mapper.MapDtoAccount;
import com.BMS.model.*;
import com.BMS.repository.AccountRepository;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@AllArgsConstructor
public class AccountService  {

    MapAccountDto mapAccountDto;
    CustomerService customerService;

    AccountRepository accountRepository;
    MapDtoAccount mapDtoAccount;
    UserService userService;
   public void addAccount(DTOAccount Dtoaccount, String username){
       Account account=mapDtoAccount.mapDtoAccount(Dtoaccount);
       User user=userService.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("invalid user name"));
      Customer customer= customerService.getCustomerIdByUserId(user.getId());
       account.setCustomer(customerService.getCustomerByIdCustomer(customer.getId()));
       account.setBalance(0.0);
       account.setStatus(Status.INACTIVE);
       Account account1= accountRepository.save(account);
       System.out.println(account1);
    }

    public Account getAccountById(int id) {
       return accountRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("invalid account id"));
    }

    public List<AccountDTO> getByStatus(Status status,int page,int size) {
        Pageable pageable= PageRequest.of(page,size);
       List<Account> list=accountRepository.findByStatus(status,pageable).getContent();
       return  list.stream().map(mapAccountDto::mapToDto).toList();
    }



    public List<AccountDtoShow> getAllAccountsByUsername(String username) {
     User user=  userService.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("invalid user name"));
       List<Account> list=accountRepository.findByCustomerUserId(user.getId());

          return list.stream().map(mapAccountDto::mapAccountToDto).toList();

    }



    public void closeAccount(int accno) {
      Account account= accountRepository.findById(accno).orElseThrow(()->new ResourceNotFoundException("invalid accno"));
       accountRepository.delete(account);
    }

    public List<AccountDtoShow> getAccountByType(AccountType accountType) {
      List<Account> list= accountRepository.findByAccounttype(accountType);
        return list.stream().map(mapAccountDto::mapAccountToDto).toList();
    }

    public void saveLoanAccount(Account account) {
       accountRepository.save(account);
    }
}
