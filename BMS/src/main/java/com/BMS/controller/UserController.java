package com.BMS.controller;

import com.BMS.DTO.CustUserDto;
import com.BMS.DTO.UserDto;
import com.BMS.DTO.UserDtoNoPassword;
import com.BMS.DTO.UserEmployeeDto;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.mapper.UserMapper;
import com.BMS.model.Customer;
import com.BMS.model.User;
import com.BMS.service.CustomerService;
import com.BMS.service.UserService;
import com.BMS.utility.JwtUtility;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    JwtUtility jwtUtility;
    UserService userService;
    CustomerService customerService;
    UserMapper userMapper;
    @PostMapping("/api/createUser")
    public UserDtoNoPassword addUser(@RequestBody UserDto userDto){
        return userService.addUser(userDto);

    }
//    @PostMapping("/api/login")
//    public CustUserDto login(@RequestBody UserDto userDto){
//        return userService.verifyUser(userDto);
//    }
    @GetMapping("/api/getUserByName")
    public UserDtoNoPassword getUserByName(@RequestParam String username){
        return userService.userByName(username);
    }
    @GetMapping("/api/loginv2")
     public CustUserDto login(Principal principal){
        String username=principal.getName();
        User user=  userService.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("Invalid user name"));
        String token = jwtUtility.generateToken(username);
        //need to be added importand
     Customer customer= customerService.getCustomerIdByUserId(user.getId());
     return userMapper.maptoCustUserDto(user,customer,token);
     }
    @GetMapping("/api/emp/loginv2")
    public UserEmployeeDto Employeelogin(Principal principal){
        String username=principal.getName();
        User user=  userService.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("Invalid user name"));
        String token = jwtUtility.generateToken(username);
        //need to be added importand
        //Customer customer= customerService.getCustomerIdByUserId(user.getId());
        return userMapper.mapToUserEmployeeDto(user,token);
    }
}
