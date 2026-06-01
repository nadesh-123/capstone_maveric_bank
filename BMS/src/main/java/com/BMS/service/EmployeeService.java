package com.BMS.service;

import com.BMS.DTO.AccountDTO;
import com.BMS.DTO.BranchDto;
import com.BMS.DTO.CustomerDto;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.Status;
import com.BMS.model.Account;
import com.BMS.model.Branch;
import com.BMS.model.Customer;
import com.BMS.model.Employee;
import com.BMS.repository.AccountRepository;
import com.BMS.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeService {
EmployeeRepository employeeRepository;
AccountRepository accountRepository;
AccountService accountService;
CustomerService customerService;
BranchService branchService;
    public Employee getEmployeeId(int empid) {
        return  employeeRepository.findById(empid).orElseThrow(()->new ResourceNotFoundException("Invalid employee id"));
    }

    public void addEmployee(Employee employee) {
        employeeRepository.save(employee);
    }

    public Employee getEmpByName(String name) {
       Employee employee= employeeRepository.findByName(name).orElseThrow(()->new ResourceNotFoundException("invalid emp name"));
       return  employee;
    }

    public void closeAccount(Account account) {
        accountRepository.delete(account);
    }

    public List<Employee> getAllEmployees() {
       return employeeRepository.findAll();
    }

    public void removeEmp(int empId) {
        Employee employee=getEmployeeId(empId);
            employeeRepository.delete(employee);

    }

    public List<AccountDTO> getByStatus(Status status) {
       return accountService.getByStatus(status);
    }
    public void addEmployeeToAccount(int empid, int accountid) {
        Account account= accountService.getAccountById(accountid);
        Customer customer=account.getCustomer();
        Branch branch=branchService.getBranchByLocation(customer.getLocation());
        account.setBranch(branch);
        account.setEmployee(getEmployeeId(empid));
        account.setStatus(Status.ACTIVE);
        accountRepository.save(account);
    }

    public CustomerDto getCustomerById(int customerId) {
      return   customerService.getCustomerById(customerId);
    }
}
