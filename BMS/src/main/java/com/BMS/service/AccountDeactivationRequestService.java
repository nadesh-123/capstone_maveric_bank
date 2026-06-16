package com.BMS.service;

import com.BMS.repository.AccountDeactivationRequestRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountDeactivationRequestService {
    private final AccountDeactivationRequestRepository accountDeactivationRequestRepository;
    public int getRequests() {
       return accountDeactivationRequestRepository.getRequests();
    }
}
