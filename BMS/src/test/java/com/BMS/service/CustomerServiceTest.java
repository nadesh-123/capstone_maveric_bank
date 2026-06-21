package com.BMS.service;

import com.BMS.DTO.CustomerDto;
import com.BMS.DTO.PaginatedCustomers;
import com.BMS.DTO.UserCutomerDto;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.Gender;
import com.BMS.enums.Location;
import com.BMS.enums.Status;
import com.BMS.mapper.CustomerMappper;
import com.BMS.model.Account;
import com.BMS.model.Branch;
import com.BMS.model.Customer;
import com.BMS.model.User;
import com.BMS.repository.CustomerRepository;
import com.BMS.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;
@ExtendWith(MockitoExtension.class)
public class CustomerServiceTest {
    @Mock
    private CustomerRepository customerRepository;
  @Mock
  private UserRepository userRepository;
    private CustomerService customerService;
private UserService userService;
    @BeforeEach
    void setUp() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        CustomerMappper customerMappper =
                new CustomerMappper(passwordEncoder);

        customerService =
                new CustomerService(customerRepository, customerMappper,userService,userRepository);
    }


    Customer customer1;
    Customer customer2;
    User user1;
    Account account;
    @BeforeEach
    public void loadSampleData(){
        customer1=new Customer();
        customer1.setName("james");
        customer1.setEmail("rose@gmail.com");
        customer2=new Customer();
        customer2.setName("john");
        customer2.setEmail("john@gmail.com");
        user1=new User();
        user1.setId(1);
        customer1.setUser(user1);

    }
    @Test
    public void getAllCustomersTest(){
      Pageable pageable=  PageRequest.of(0,2);
List<Customer> customers=List.of(customer1);
        Page<Customer> page = new PageImpl<>(customers, PageRequest.of(0, 2), customers.size());


        when(customerRepository.findByUserStatus(Status.ACTIVE, pageable))
                .thenReturn(page);
       PaginatedCustomers paginatedCustomers= customerService.getAllCustomers(0,2);
       assertThat(paginatedCustomers.totalElements()).isEqualTo(1);


    }
    @Test
    public void getAllCustomersTest_ProduceNull(){
        Pageable pageable=  PageRequest.of(0,2);
        List<Customer> customers=List.of();
        Page<Customer> page = new PageImpl<>(customers, PageRequest.of(0, 2), customers.size());


        when(customerRepository.findByUserStatus(Status.ACTIVE, pageable))
                .thenReturn(page);
        PaginatedCustomers paginatedCustomers= customerService.getAllCustomers(0,2);
        assertThat(paginatedCustomers.totalElements()).isEqualTo(0);


    }
    @Test
    public void TestPostCustomer(){
        when(userRepository.save(any(User.class))).thenReturn(user1);
        when(customerRepository.save(any(Customer.class))).thenReturn(customer1);
        UserCutomerDto userCutomerDto=new UserCutomerDto("joe","pass","joe john","joe@gmal.com", Gender.FEMALE,null,"8978999","7987999","sjfkjsf", Location.CHENNAI) ;
              CustomerDto customerDto= customerService.createCustomer(userCutomerDto);
              assertThat(customerDto.fullname()).isEqualToIgnoringCase("joe john");
        verify(customerRepository, times(1)).save(any(Customer.class));
    }
@Test
    public void TestGetById_success(){
        when(customerRepository.findById(1)).thenReturn(Optional.of(customer1));
        CustomerDto customerDto=customerService.getCustomerById(1);
        assertThat(customerDto.fullname()).isEqualToIgnoringCase("james");

}
    @Test
    void getById_categoryDoesNotExist(){
        when(customerRepository.findById(100)).thenReturn(Optional.empty());

        assertThatThrownBy(()-> customerService.getCustomerById(100))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("invalid customer id");
    }
    @Test
    void testCustomerDelete(){
        when(userRepository.findById(1)).thenReturn(Optional.of(user1));
        when(userRepository.save(any(User.class))).thenReturn(user1);
        customerService.removeCustomer(1);

    }

}
