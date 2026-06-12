package com.BMS.service;

import com.BMS.mapper.BeneficiaryMapper;
import com.BMS.model.Beneficiary;
import com.BMS.DTO.BenficiaryDto;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.model.Account;
import com.BMS.model.Customer;
import com.BMS.repository.AccountRepository;
import com.BMS.repository.BenficiaryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BenficiaryService {
    BeneficiaryMapper beneficiaryMapper;
    CustomerService customerService;
    private final  AccountRepository accountRepository;
    private final BenficiaryRepository benficiaryRepository;
    public void addBenficiary(BenficiaryDto benficiaryDto, String username) {
        Customer customer=  customerService.getByUsername(username);
        Account account=accountRepository.findByAccountNumber(benficiaryDto.accountNumber()).orElseThrow(()->new ResourceNotFoundException("invalid Account Number"));
        Beneficiary beneficiary=new Beneficiary();
        beneficiary.setAccount(account);
        beneficiary.setCustomer(customer);
        if(!account.getBranch().getIfscCode().equals(benficiaryDto.ifsccode())){
            throw new ResourceNotFoundException("invalid ifsc code");
        }
        beneficiary.setIfsccode(benficiaryDto.ifsccode());
        benficiaryRepository.save(beneficiary);
    }
public Beneficiary getBenficiaryById(int benid){
        return benficiaryRepository.findById(benid).orElseThrow(()->new ResourceNotFoundException("invalid benficiary id"));
}
    public void deleteBenficiary(int benId) {
       Beneficiary beneficiary= getBenficiaryById(benId);
        benficiaryRepository.delete(beneficiary);
    }

    public List<BenficiaryDto> getBeneficiaryByUsername(String username) {
       List<Beneficiary> list= benficiaryRepository.findByCustomerUserUsername(username);
       return list.stream().map(beneficiaryMapper::mapToDto).toList();
    }
}
