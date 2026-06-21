package com.BMS.service;

import com.BMS.DTO.*;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.Status;
import com.BMS.mapper.CustomerMappper;
import com.BMS.model.*;
import com.BMS.repository.CustomerRepository;
import com.BMS.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMappper customerMappper;
    private final UserService userService;
    private final UserRepository userRepository;
    public CustomerDto getCustomerById(int customerId) {
       Customer customer= customerRepository.findById(customerId).orElseThrow(()->new ResourceNotFoundException("invalid customer id"));
      return customerMappper.mapCustomerDto(customer);
    }

    public CustomerDto createCustomer(UserCutomerDto userCutomerDto) {
        Customer customer=CustomerMappper.mapCustomer(userCutomerDto);
       User user= customerMappper.mapToUser(userCutomerDto);
       user.setStatus(Status.ACTIVE);
       userRepository.save(user);
        customer.setUser(user);
        customer.setStatus(Status.ACTIVE);
        customerRepository.save(customer);
        return customerMappper.mapCustomerDto(customer);
    }
    public Customer getByUsername(String username) {
        return customerRepository.findByUserUsername(username);
    }
    public Customer getCustomerIdByUserId(int userId) {
        User user=userService.findById(userId);
        Customer customer=customerRepository.findByUserId(userId).orElseThrow(()->new ResourceNotFoundException("customer is not added"));
        return customer;
    }

    public Customer getCustomerByIdCustomer(int customerId) {
        return  customerRepository.findById(customerId).orElseThrow(()->new ResourceNotFoundException("invalid cus id"));
    }
    public void save(Customer customer) {
        customerRepository.save(customer);
    }

    public long getAllActive() {
        return customerRepository.getAllActive(Status.ACTIVE);
    }

    public PaginatedCustomers getAllCustomers(int page,int size) {

      Pageable pageable= PageRequest.of(page,size);
       Page<Customer> pages= customerRepository.findByUserStatus(Status.ACTIVE,pageable);
       List<CustomerForAdminDto> list=pages.stream().map((k)->customerMappper.mapToDto(k)).toList();
       return new PaginatedCustomers(pages.getTotalElements(),pages.getTotalPages(),list);
    }


    public void removeCustomer(int userId) {
     User user=   userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("invalid user id"));
     user.setStatus(Status.INACTIVE);
     userRepository.save(user);
    }
}
