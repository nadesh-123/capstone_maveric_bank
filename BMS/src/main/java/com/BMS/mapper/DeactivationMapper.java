package com.BMS.mapper;

import com.BMS.DTO.AccountDeactivationRequestDto;
import com.BMS.model.AccountDeactivationRequest;
import org.springframework.stereotype.Component;

@Component
public class DeactivationMapper {
    public AccountDeactivationRequestDto mapEntityToDto(AccountDeactivationRequest accountDeactivationRequest){
        return new AccountDeactivationRequestDto(accountDeactivationRequest.getId(),accountDeactivationRequest.getAccount().getAccountNumber(),accountDeactivationRequest.getAccount().getCustomer().getName(),accountDeactivationRequest.getCreatedAt());
    }
}
