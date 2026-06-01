package com.BMS.service;

import com.BMS.DTO.AccountDTO;
import com.BMS.DTO.AccountDtoShow;
import com.BMS.DTO.DTOAccount;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.AccountType;
import com.BMS.enums.Status;
import com.BMS.mapper.MapAccountDto;
import com.BMS.mapper.MapDtoAccount;
import com.BMS.model.Account;
import com.BMS.model.Branch;
import com.BMS.model.Employee;
import com.BMS.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AccountService  {
    EmployeeService employeeService;
    MapAccountDto mapAccountDto;
    CustomerService customerService;
    BranchService branchService;
    AccountRepository accountRepository;
    MapDtoAccount mapDtoAccount;
   public void addAccount(DTOAccount Dtoaccount, String branchName, int customerId){
       Branch b=branchService.getBranchByName(branchName);
       System.out.println(b);
       System.out.println(b.getBranchName());
       Account account=mapDtoAccount.mapDtoAccount(Dtoaccount);
       account.setCustomer(customerService.getCustomerByIdCustomer(customerId));
       account.setBranch(b);
       account.setBalance(0.0);
       account.setStatus(Status.INACTIVE);
       Account account1= accountRepository.save(account);
       System.out.println(account1);
    }

    public Account getAccountById(int id) {
       return accountRepository.findById(id).orElseThrow();
    }

    public List<AccountDTO> getByStatus(Status status) {

       List<Account> list=accountRepository.findByStatus(status);
       return  list.stream().map(mapAccountDto::mapToDto).toList();
    }

    public void addEmployeeAccount(int empid, int accountid) {
      Account account= accountRepository.findById(accountid).orElseThrow(()->new ResourceNotFoundException("Invalid account id"));
      account.setEmployee(employeeService.getEmployeeId(empid));
      account.setStatus(Status.ACTIVE);
      accountRepository.save(account);
    }

    public List<AccountDtoShow> getAllAccountsByCustomerId(int customerId) {
       List<Account> list=accountRepository.findByCustomerId(customerId);

          return list.stream().map(mapAccountDto::mapAccountToDto).toList();

    }

    public void approveAccount(int accNo, int empid) {
      Account account =accountRepository.findByAccno(accNo).orElseThrow(()->new ResourceNotFoundException("invalid acc no"));
      account.setStatus(Status.ACTIVE);
        Employee employee=employeeService.getEmployeeId(empid);
        account.setEmployee(employee);
      accountRepository.save(account);
    }

    public void closeAccount(int accno) {
      Account account= accountRepository.findById(accno).orElseThrow(()->new ResourceNotFoundException("invalid accno"));
       accountRepository.delete(account);
    }

    public List<AccountDtoShow> getAccountByType(AccountType accountType) {
      List<Account> list= accountRepository.findByAccounttype(accountType);
        return list.stream().map(mapAccountDto::mapAccountToDto).toList();
    }
}
