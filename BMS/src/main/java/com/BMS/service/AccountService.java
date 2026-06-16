package com.BMS.service;

import com.BMS.DTO.AccountDTO;
import com.BMS.DTO.AccountDtoPaginated;
import com.BMS.DTO.AccountDtoShow;
import com.BMS.DTO.DTOAccount;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.AccountType;
import com.BMS.enums.Status;
import com.BMS.mapper.MapAccountDto;
import com.BMS.mapper.MapDtoAccount;
import com.BMS.model.*;
import com.BMS.repository.AccountRepository;
import com.BMS.utility.AccountNumberGenerator;
import com.BMS.utility.FileUtility;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
@AllArgsConstructor
public class AccountService  {
    private static final String UPLOAD_LOC = "D:/UploadFileApi";
    MapAccountDto mapAccountDto;
    AccountNumberGenerator accountNumberGenerator;
    private final CustomerService customerService;
 private final BranchService branchService;
    private final AccountRepository accountRepository;
    MapDtoAccount mapDtoAccount;
    private final  UserService userService;
   public void addAccount(DTOAccount Dtoaccount, String username, MultipartFile[] files) throws IOException {
       upload(username,files);
       Account account=mapDtoAccount.mapDtoAccount(Dtoaccount);
       User user=userService.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("invalid user name"));
      Customer customer= customerService.getCustomerIdByUserId(user.getId());
       System.out.println(customer.getLocation());
      Branch branch=branchService.getBranchByLocation(customer.getLocation());
       System.out.println(branch);
       account.setCustomer(customerService.getCustomerByIdCustomer(customer.getId()));
       account.setAccountNumber(accountNumberGenerator.generateAccountNumber());
       account.setBranch(branch);
       account.setBalance(0.0);
       account.setStatus(Status.INACTIVE);
       Account account1= accountRepository.save(account);
       System.out.println(account1);
    }



    public AccountDtoPaginated getByStatus(Status status,int page,int size) {
        Pageable pageable= PageRequest.of(page,size);
       Page<Account> pages=accountRepository.findByStatusEmpNull(status,pageable);
       List<AccountDTO> list= pages.getContent().stream().map(mapAccountDto::mapToDto).toList();
       Long totalElements=pages.getTotalElements();
       int totalPages=pages.getTotalPages();
       return new AccountDtoPaginated(totalElements,totalPages,list);
    }



    public List<AccountDtoShow> getAllAccountsByUsername(String username) {
     User user=  userService.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("invalid user name"));
       List<Account> list=accountRepository.findByCustomerUserId(user.getId());

          return list.stream().map(mapAccountDto::mapAccountToDto).toList();

    }
    public List<AccountDtoShow> getAllActiveAccountsByUsername(String username) {
        User user=  userService.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("invalid user name"));
        List<Account> list=accountRepository.findByCustomerUserId(user.getId());

        return list.stream().map(mapAccountDto::mapAccountToDto).filter(mapAccountDto->mapAccountDto.status().equals(Status.ACTIVE)).toList();

    }




    public List<AccountDtoShow> getAccountByType(AccountType accountType) {
      List<Account> list= accountRepository.findByAccounttype(accountType);
        return list.stream().map(mapAccountDto::mapAccountToDto).toList();
    }

    public void saveLoanAccount(Account account) {
       accountRepository.save(account);
    }

public void upload(String username, MultipartFile[] files) throws IOException {

    Customer customer = customerService.getByUsername(username);
    System.out.println(customer);
    String uniqueFolderName = username + "_files";
    Path userUploadDir = Paths.get(UPLOAD_LOC).resolve(uniqueFolderName);
    if (!Files.exists(userUploadDir)) {
        Files.createDirectories(userUploadDir);
    }
    for (MultipartFile file : files) {
        if (file.isEmpty()) continue; // Skip empty uploads
        FileUtility.validateFile(file);
        String fileName = file.getOriginalFilename();
        Path destinationPath = userUploadDir.resolve(fileName);
        System.out.println(fileName);
        Files.copy(file.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);
    }

    System.out.println();
    customer.setDocumentsPath(userUploadDir.toString());
    customerService.save(customer);
}


    public Account getAccountByAccountNumber(String s) {
       return accountRepository.findByAccountNumber(s).orElseThrow(()->new ResourceNotFoundException("invalid accno"));
    }

    public int getActiveCount(int id) {
      return accountRepository.countActiveAccountsByEmployee(Status.ACTIVE,id);
    }

    public int getInActiveCount(int id) {
       return accountRepository.countInActiveAccountsByEmployee(Status.INACTIVE,id);
    }

    public int findAccountRequests() {
      return accountRepository.getAccountRequestCount();
    }
}
