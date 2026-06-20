package com.BMS.service;

import com.BMS.DTO.AccountDtoShow;
import com.BMS.enums.Status;
import com.BMS.model.Account;
import com.BMS.model.Branch;
import com.BMS.model.Customer;
import com.BMS.model.User;
import com.BMS.repository.AccountRepository;
import com.BMS.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.within;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;
@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {
    @Mock
    AccountRepository accountRepository;
    @Mock
    UserRepository userRepository;
    @InjectMocks
    AccountService accountService;
    Customer customer1;
    Customer customer2;
    User user1;
    Account account;
    @BeforeEach
    public void loadSampleData(){
        customer1=new Customer();
        customer1.setName("james");
        customer1.setEmail("rose@gmail.com");
        customer2=new Customer();
        customer2.setName("john");
        customer2.setEmail("john@gmail.com");
        user1=new User();
        user1.setId(1);
        user1.setUsername("James123");
        customer1.setUser(user1);
         account=new Account();
         account.setCustomer(customer1);
         account.setBranch(new Branch());
         account.setBalance(6700.0);
         account.setStatus(Status.ACTIVE);
    }
    @Test
public void testGetAllActiveAccount(){
        when(userRepository.findByUsername("James123")).thenReturn(Optional.of(user1));
        when(accountRepository.findByCustomerUserId(user1.getId())).thenReturn(List.of(account));
       List<AccountDtoShow> list= accountService.getAllActiveAccountsByUsername("James123");
       assertThat(list).hasSize(1);

}
    @Test
    public void testGetAllActiveAccount_ProduceNull(){
        when(userRepository.findByUsername("James123")).thenReturn(Optional.of(user1));
        when(accountRepository.findByCustomerUserId(user1.getId())).thenReturn(List.of());
        List<AccountDtoShow> list= accountService.getAllActiveAccountsByUsername("James123");
        assertThat(list).hasSize(0);

    }

}
