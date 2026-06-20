package com.BMS.mapper;

import com.BMS.DTO.CustomerDto;
import com.BMS.DTO.CustomerForAdminDto;
import com.BMS.DTO.UserCutomerDto;
import com.BMS.DTO.loanDto;
import com.BMS.enums.Gender;
import com.BMS.enums.Role;
import com.BMS.model.Customer;
import com.BMS.model.LoanApplication;
import com.BMS.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CustomerMappper {
   PasswordEncoder passwordEncoder;
    public static Customer mapCustomer(UserCutomerDto userCutomerDto){
        Customer customer=new Customer();
        customer.setAadharno(userCutomerDto.aadharno());
        customer.setLocation(userCutomerDto.location());
        customer.setDob(userCutomerDto.dob());
        customer.setGender(userCutomerDto.gender());
        customer.setEmail(userCutomerDto.email());
        customer.setPhonenumber(userCutomerDto.phonenumber());
        customer.setPanno(userCutomerDto.panno());
        customer.setName(userCutomerDto.fullname());
        return customer;}


    public User mapToUser(UserCutomerDto userCutomerDto){
        User user=new User();
        user.setUsername(userCutomerDto.username());
        user.setRole(Role.CUSTOMER);
        user.setPassword(passwordEncoder.encode(userCutomerDto.password()));
        return user;
    }

    public CustomerDto mapCustomerDto(Customer customer) {
        return new CustomerDto(customer.getId(),customer.getName(),customer.getEmail(),customer.getGender(),customer.getDob(),customer.getPhonenumber(),customer.getAadharno(),customer.getPanno(),customer.getLocation());
    }
    public LoanApplication mapToLoanApp(loanDto loanDto){
        LoanApplication loanApplication=new LoanApplication();
        loanApplication.setLoneType(loanDto.loanType());
        return loanApplication;
    }
    public static CustomerForAdminDto mapToDto(Customer customer){
        return new CustomerForAdminDto(customer.getUser().getId(),customer.getName(),customer.getUser().getUsername(),customer.getEmail(),customer.getUser().getStatus());
    }
    }



