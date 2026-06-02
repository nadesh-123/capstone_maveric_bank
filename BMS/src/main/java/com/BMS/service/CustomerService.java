package com.BMS.service;

import com.BMS.DTO.*;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.LoanStatus;
import com.BMS.enums.Status;
import com.BMS.mapper.CustomerMappper;
import com.BMS.model.Customer;
import com.BMS.model.LoanApplication;
import com.BMS.model.User;
import com.BMS.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomerService {

    CustomerRepository customerRepository;
    CustomerMappper customerMappper;
    UserService userService;

    BenficiaryService benficiaryService;
    public CustomerDto getCustomerById(int customerId) {
       Customer customer= customerRepository.findById(customerId).orElseThrow(()->new RuntimeException("invalid customer id"));
      return customerMappper.mapCustomerDto(customer);
    }

    public void createCustomer(UserCutomerDto userCutomerDto) {
        Customer customer=customerMappper.mapCustomer(userCutomerDto);
       User user= customerMappper.mapToUser(userCutomerDto);
       userService.addUser(user);
        customer.setUser(user);
        customer.setStatus(Status.ACTIVE);
        customerRepository.save(customer);
    }

    public Customer getCustomerIdByUserId(int userId) {
        User user=userService.findById(userId);
       Customer customer=customerRepository.findByUserId(userId).orElseThrow(()->new ResourceNotFoundException("customer is not added"));
       return customer;
    }

    public Customer getCustomerByIdCustomer(int customerId) {
        return  customerRepository.findById(customerId).orElseThrow(()->new ResourceNotFoundException("invalid cus id"));
    }



    public void addBenficiary(int accno, BenficiaryDto benficiaryDto) {
        Beneficiary beneficiary=new Beneficiary();


        beneficiary.setIfsccode(benficiaryDto.ifsccode());
        benficiaryService.addBenficiary(beneficiary,accno);
    }

    public void deleteBenficiary(int benId) {
        benficiaryService.deleteBenficiary(benId);


    }

    public Beneficiary getBenficiaryById(int benId) {
      return   benficiaryService.getBenficiaryById(benId);
    }

    public Customer getByUsername(String username) {
       return customerRepository.findByUserUsername(username);
    }

//    public void deleteLoanApplication(int loanAppId) {
//        loanApplicationService.deleteLoanApplication(loanAppId);
//    }
//
//    public LoanAppDto applicationById(int loanAppId) {
//       return loanApplicationService.getLoanApplication(loanAppId);
//    }
}
