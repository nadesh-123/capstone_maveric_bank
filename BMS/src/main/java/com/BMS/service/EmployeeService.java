package com.BMS.service;

import com.BMS.DTO.*;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.Status;
import com.BMS.model.*;
import com.BMS.repository.AccountRepository;
import com.BMS.repository.EmployeeRepository;
import com.BMS.repository.LoanApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final AccountRepository accountRepository;
    private final AccountService accountService;
    private final AccountDeactivationRequestService accountDeactivationRequestService;
    private final LoanApplicationRepository loanApplicationRepository;
    private final CustomerService customerService;
    private final BranchService branchService;

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

    public void closeAccount(Account account, String username)
    {
       AccountDeactivationRequest accountDeactivationRequest= accountDeactivationRequestService.getByAccount(account);
       accountDeactivationRequest.setEmployee(getEmpByUserName(username));
       accountDeactivationRequestService.addEmpToRequest(accountDeactivationRequest);
        account.setStatus(Status.INACTIVE);
        accountRepository.save(account);
    }

    public List<Employee> getAllEmployees(int page,int size) {
        Pageable pageable= PageRequest.of(page,size);
        return employeeRepository.findAll(pageable).getContent();
    }

    public void removeEmp(int empId) {
        Employee employee=getEmployeeId(empId);
            employeeRepository.delete(employee);

    }


    public void addEmployeeToAccount(String username, String accountid) {
        Account account= accountService.getAccountByAccountNumber(accountid);
        Customer customer=account.getCustomer();
        Branch branch=branchService.getBranchByLocation(customer.getLocation());
        account.setBranch(branch);
        account.setEmployee(getEmpByUserName(username));
        account.setStatus(Status.ACTIVE);
        accountRepository.save(account);
    }

    public CustomerDto getCustomerById(int customerId) {
      return   customerService.getCustomerById(customerId);
    }

    public Employee getEmpByUserName(String username) {
        return employeeRepository.findByEmpUserName(username);
    }

    public EmployeeActionStat getActionStat(String username) {
        Employee employee=getEmployeeByUsername(username);
      int activeCount=  accountService.getActiveCount(employee.getId());
      int inactiveCount=accountService.getInActiveCount(employee.getId());
      List<Integer> data=List.of(activeCount,inactiveCount);
      List<String>  labels=List.of("Activated","Inactivated");
      return new EmployeeActionStat(labels,data);
    }

    private Employee getEmployeeByUsername(String username) {
        return  employeeRepository.findByUserUsername(username);
    }

    public EmployeePendingActions getPendingActions() {
       int accountCount= accountService.findAccountRequests();
       int accountDeactivationRequests=accountDeactivationRequestService.getRequests();
       int loanRequests=loanApplicationRepository.getRequests();
       return new EmployeePendingActions(accountCount,accountDeactivationRequests,loanRequests);
    }
}
