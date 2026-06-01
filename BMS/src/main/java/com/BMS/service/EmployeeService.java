package com.BMS.service;

import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.model.Account;
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
}
