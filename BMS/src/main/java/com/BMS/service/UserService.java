package com.BMS.service;

import com.BMS.DTO.UserDto;
import com.BMS.DTO.UserDtoNoPassword;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.mapper.UserMapper;
import com.BMS.model.User;
import com.BMS.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService  {

    UserRepository userRepository;
    UserMapper userMapper;

    public void addUser(User user) {


       user= userRepository.save(user);

    }
public UserDtoNoPassword userByName(String username){
        User user=userRepository.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("Invalid user name"));
      return   userMapper.mapDto(user);
}
//    public CustUserDto verifyUser(UserDto userDto) {
//      User user=  userRepository.findByUsername(userDto.username()).orElseThrow(()->new ResourceNotFoundException("Invalid user name"));
//   UserDtoNoPassword userDtoNoPassword=authService.authUser(user,userDto);
//  Customer customer= customerRepository.findByUserId(user.getId());
//        CustUserDto custUserDto=new CustUserDto(user.getId(),user.getUsername(),customer.getId());
//        return custUserDto;
//    }

    public User findById(int userid) {
        try{
         User user1=   userRepository.findById(userid).orElseThrow(()->new ResourceNotFoundException("invalid id from findById"));
         return  user1;
        }
      catch (Exception e){
          System.out.println(e.getMessage());
      }
        return null;
    }



    public Optional<User> findByUsername(String username) {
        return  userRepository.findByUsername(username);
    }

    public User addEmployeeUser(User user) {
       return userRepository.save(user);
    }

    public void addAdminUser(UserDto userDto) {
        userMapper.userMapper(userDto);
    }
}
