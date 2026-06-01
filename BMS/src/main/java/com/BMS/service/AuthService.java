package com.BMS.service;

import com.BMS.DTO.UserDto;
import com.BMS.DTO.UserDtoNoPassword;
import com.BMS.message.Message;
import com.BMS.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AuthService {


    public UserDtoNoPassword authUser(User user, UserDto userDto){
        UserDtoNoPassword userDtoNoPassword=null;
        if(user.getUsername().equals(userDto.username())&& user.getPassword().equals(userDto.password())){

            userDtoNoPassword   =new UserDtoNoPassword(user.getId(),user.getUsername());


        }
        return userDtoNoPassword;
    }
}
