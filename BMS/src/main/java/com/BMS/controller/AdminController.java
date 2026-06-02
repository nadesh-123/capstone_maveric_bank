package com.BMS.controller;

import com.BMS.DTO.DtoEmployee;
import com.BMS.DTO.EmployeeDto;
import com.BMS.DTO.UserDto;
import com.BMS.service.AdminService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class AdminController {
    AdminService adminService;

    @PostMapping("/admin/add-admin")
    public void addAdmin(@RequestBody UserDto userDto) {
        adminService.addAdmin(userDto);
    }

    @PostMapping("/admin/add-employee")
    public void registerEmp(@RequestBody EmployeeDto employeeDto) {
        adminService.addEmployee(employeeDto);
    }

    @GetMapping("/api/admin/getEmpById/{empid}")
    public DtoEmployee getEmployeeById(@PathVariable int empid) {
        return adminService.getEmployeeById(empid);
    }

    @GetMapping("/api/admin/getEmpByName/{name}")
    public DtoEmployee getEmployeeByName(@PathVariable String name) {
        return adminService.getEmployeeByName(name);
    }

    @GetMapping("/api/admin/get-alL-emp")
    public List<DtoEmployee> getAllEmployees(@RequestParam(defaultValue = "0",required = false) int page,@RequestParam(defaultValue = "0",required = false) int size) {
        return adminService.getAllEmployees(page,size);
    }
    @DeleteMapping("/api/admin/remove-emp/{empId}")
    public void removeEmp(@PathVariable int empId){
        adminService.removeEmp(empId);
    }
}
