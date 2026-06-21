package com.BMS.controller;

import com.BMS.DTO.*;
import com.BMS.service.AdminService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class AdminController {
    private final  AdminService adminService;

    @PostMapping("/api/admin/add-admin")
    public void addAdmin(@RequestBody UserDto userDto) {
        adminService.addAdmin(userDto);
    }

    @PostMapping("/api/admin/add-employee")
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
    public PaginatedActiveEmployees getAllEmployees(@RequestParam(defaultValue = "0",required = false) int page, @RequestParam(defaultValue = "5",required = false) int size) {
        return adminService.getAllEmployees(page,size);
    }

    @DeleteMapping("/api/admin/remove-emp/{userId}")
    public void removeEmp(@PathVariable int userId){
        adminService.removeEmp(userId);
    }
    @DeleteMapping("/api/admin/remove-customer/{userId}")
    public void removeCustomer(@PathVariable int userId){
        adminService.removeCustomer(userId);
    }
    @GetMapping("/api/admin/get-reports")
    public AdminReports getAdminReports(){
        return adminService.getReports();
    }

}
