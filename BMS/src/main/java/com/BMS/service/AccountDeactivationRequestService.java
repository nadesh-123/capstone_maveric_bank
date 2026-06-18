package com.BMS.service;

import com.BMS.DTO.AccountDeactivationRequestDto;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.controller.AccountDeactivationPaginated;
import com.BMS.mapper.DeactivationMapper;
import com.BMS.model.Account;
import com.BMS.model.AccountDeactivationRequest;
import com.BMS.repository.AccountDeactivationRequestRepository;
import com.BMS.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AccountDeactivationRequestService {
    private final AccountRepository accountRepository;
    private final DeactivationMapper deactivationMapper;
    private final AccountDeactivationRequestRepository accountDeactivationRequestRepository;
    public int getRequests() {
       return accountDeactivationRequestRepository.getRequests();
    }

    public void postRequest(String accountNumber) {
        AccountDeactivationRequest ad=new AccountDeactivationRequest();

        ad.setAccount(accountRepository.findByAccountNumber(accountNumber).orElseThrow(()->new ResourceNotFoundException("invalid AccountNumber")));
        accountDeactivationRequestRepository.save(ad);
    }

    public AccountDeactivationPaginated getAllRequests(int page,int size) {
       Pageable pageable = PageRequest.of(page,size);
      Page<AccountDeactivationRequest> pages= accountDeactivationRequestRepository.getAllPendingrequests(pageable);
     List<AccountDeactivationRequestDto> list= pages.getContent().stream().map(deactivationMapper::mapEntityToDto).toList();
     return new AccountDeactivationPaginated(pages.getTotalElements(),pages.getTotalPages(),list);
    }

    public AccountDeactivationRequest getByAccount(Account account) {
       return accountDeactivationRequestRepository.findByAccount(account);
    }

    public void addEmpToRequest(AccountDeactivationRequest accountDeactivationRequest) {
        accountDeactivationRequestRepository.save(accountDeactivationRequest);
    }
}
