package com.BMS.controller;

import com.BMS.DTO.*;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.Exception.UserInActiveException;
import com.BMS.enums.Status;
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

public class UserController {
    private final  JwtUtility jwtUtility;
    private final UserService userService;
    private final CustomerService customerService;
    private final UserMapper userMapper;

    @GetMapping("/api/user/loginv2")
     public CustUserDto login(Principal principal){
        String username=principal.getName();
        User user=  userService.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("Invalid user name"));
        if(user.getStatus().equals(Status.INACTIVE)){
            throw new UserInActiveException("User is inactive");
        }
        String token = jwtUtility.generateToken(username);


     return userMapper.maptoCustUserDto(user,token);
     }
    @GetMapping("/api/user/emp/loginv2")
    public UserEmployeeDto Employeelogin(Principal principal){
        String username=principal.getName();
        User user=  userService.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("Invalid user name"));
        if(user.getStatus().equals(Status.INACTIVE)){
            throw new UserInActiveException("User is inactive");
        }
        String token = jwtUtility.generateToken(username);
        return userMapper.mapToUserEmployeeDto(user,token);
    }

   @GetMapping("/api/user/get-details")
    public UserDetailsDto getUserDetails(Principal principal){
        String username=principal.getName();
        return  userService.getUserDetails(username);
   }
}
