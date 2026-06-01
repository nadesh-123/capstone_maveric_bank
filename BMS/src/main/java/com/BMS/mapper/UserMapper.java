package com.BMS.mapper;

import com.BMS.DTO.CustUserDto;
import com.BMS.DTO.UserDto;
import com.BMS.DTO.UserDtoNoPassword;
import com.BMS.DTO.UserEmployeeDto;
import com.BMS.model.Customer;
import com.BMS.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserMapper {
    PasswordEncoder passwordEncoder;
    public User userMapper(UserDto userDto){
      User user= new User();
      user.setUsername(userDto.username());
      user.setPassword(passwordEncoder.encode(userDto.password()));
      user.setRole(userDto.role());
      return user;
    }
    public UserDtoNoPassword mapDto(User user){
        return  new UserDtoNoPassword(user.getId(),user.getUsername());
    }
    public CustUserDto maptoCustUserDto(User user, Customer customer,String token){
        return new CustUserDto(user.getId(),user.getRole(),user.getUsername(), customer.getId(), token);
    }
    public UserEmployeeDto mapToUserEmployeeDto(User user,String token){
        return new UserEmployeeDto(user.getId(),user.getRole(),user.getUsername(),token);
    }
}
