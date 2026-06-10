package com.BMS.service;

import com.BMS.DTO.Beneficiary;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.repository.AccountRepository;
import com.BMS.repository.BenficiaryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BenficiaryService {
    private final  AccountRepository accountRepository;
    private final BenficiaryRepository benficiaryRepository;
    public void addBenficiary(Beneficiary beneficiary, String accno) {
        beneficiary.setAccount(accountRepository.findByAccountNumber(accno).orElseThrow(()->new ResourceNotFoundException("invalid accno")));
        benficiaryRepository.save(beneficiary);
    }
public Beneficiary getBenficiaryById(int benid){
        return benficiaryRepository.findById(benid).orElseThrow(()->new ResourceNotFoundException("invalid benficiary id"));
}
    public void deleteBenficiary(int benId) {
       Beneficiary beneficiary= getBenficiaryById(benId);
        benficiaryRepository.delete(beneficiary);
    }
}
