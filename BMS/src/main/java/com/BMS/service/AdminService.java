package com.BMS.service;

import com.BMS.DTO.*;
import com.BMS.enums.Status;
import com.BMS.mapper.EmployeeMapper;
import com.BMS.model.Customer;
import com.BMS.model.Employee;
import com.BMS.model.User;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminService {
    private final  EmployeeService employeeService;
    private final UserService userService;
private final CustomerService customerService;
private final AccountService accountService;
private final TransactionService transactionService;
EmployeeMapper employeeMapper;
    public void addEmployee(EmployeeDto employeeDto) {
      Employee employee= employeeMapper.employeeMap(employeeDto);
        User user=employeeMapper.employeeUserMap(employeeDto);
        user.setStatus(Status.ACTIVE);
       User user1= userService.addEmployeeUser(user);
       employee.setUser(user1);
       employeeService.addEmployee(employee);
    }

    public void addAdmin(UserDto userDto) {
        userService.addAdminUser(userDto);
    }

    public DtoEmployee getEmployeeById(int empid) {
        Employee employee=employeeService.getEmployeeId(empid);
      return  employeeMapper.mapToDto(employee);
    }

    public DtoEmployee getEmployeeByName(String name) {
        Employee employee=employeeService.getEmpByName(name);
        return  employeeMapper.mapToDto(employee);
    }

    public void deleteUser(int userId) {

    }

    public PaginatedActiveEmployees getAllEmployees(int page, int size) {
     Page<Employee> pages=   employeeService.getAllEmployees(page,size);
     List<DtoEmployee> list= pages.getContent().stream().map(employeeMapper::mapToDto).toList();
     return  new PaginatedActiveEmployees(pages.getTotalElements(),pages.getTotalPages(),list);
    }

    public void removeEmp(int empId) {
        employeeService.removeEmp(empId);
    }

    public AdminReports getReports() {
        long activeCustomers=customerService.getAllActive();
        long activeEmployees=employeeService.getAllActive();
        long activeAccounts=accountService.getTotalActiveCount();
        long totalTransactions=transactionService.getTotalTransactions();
        return  new AdminReports(activeCustomers,activeEmployees,activeAccounts,totalTransactions);
    }

    public void removeCustomer(int userId) {
        customerService.removeCustomer(userId);
    }
}
