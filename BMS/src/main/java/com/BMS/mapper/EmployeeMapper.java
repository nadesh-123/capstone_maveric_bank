package com.BMS.mapper;

import com.BMS.DTO.DtoEmployee;
import com.BMS.DTO.EmployeeDto;
import com.BMS.model.Employee;
import com.BMS.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class EmployeeMapper {
    PasswordEncoder passwordEncoder;
    public Employee employeeMap(EmployeeDto employeeDto){
        Employee employee=new Employee();
        employee.setName(employeeDto.name());
        employee.setEmail(employeeDto.email());
        employee.setContactno(employeeDto.contactno());

        return employee;
    }
    public User employeeUserMap(EmployeeDto employeeDto){
        User user=new User();
        user.setRole(employeeDto.role());
        user.setUsername(employeeDto.username());
        user.setPassword(passwordEncoder.encode(employeeDto.password()));
        return user;
    }
    public DtoEmployee mapToDto(Employee employee){
        return  new DtoEmployee(employee.getId(),employee.getName(),employee.getEmail());
    }
}
