package com.BMS.mapper;

import com.BMS.DTO.CustomerDto;
import com.BMS.DTO.loanDto;
import com.BMS.model.Customer;
import com.BMS.model.LoanApplication;
import org.springframework.stereotype.Component;

@Component
public class CustomerMappper {
    public Customer mapCustomer(CustomerDto customerDto){
        Customer customer=new Customer();
        customer.setAadharno(customerDto.aadharno());
        customer.setDob(customerDto.dob());
        customer.setGender(customerDto.gender());
        customer.setEmail(customerDto.email());
        customer.setPhonenumber(customerDto.phonenumber());
        customer.setPanno(customerDto.panno());
        customer.setName(customerDto.fullname());
        return customer;}

    public CustomerDto mapCustomerDto(Customer customer) {
        return new CustomerDto(customer.getId(),customer.getName(),customer.getEmail(),customer.getGender(),customer.getDob(),customer.getPhonenumber(),customer.getAadharno(),customer.getPanno());
    }
    public LoanApplication mapToLoanApp(loanDto loanDto){
        LoanApplication loanApplication=new LoanApplication();
        loanApplication.setLoneType(loanDto.loanType());
        return loanApplication;
    }
    }



