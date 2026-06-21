package com.BMS.service;
import com.BMS.model.User;
import com.BMS.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;
@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {
    @Mock
    UserRepository userRepository;
    @InjectMocks
    EmployeeService employeeService;
    User user1;
    @BeforeEach
    public void loan(){
        user1=new User();
        user1.setId(1);
        user1.setUsername("james123");
    }
    @Test
    public void testDeleteEmployee(){
        when(userRepository.findById(1)).thenReturn(Optional.of(user1));
        when(userRepository.save(any(User.class))).thenReturn(user1);
        employeeService.removeEmp(1);
    }
}
