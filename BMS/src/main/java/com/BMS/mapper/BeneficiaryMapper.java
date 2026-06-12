package com.BMS.mapper;

import com.BMS.DTO.BenficiaryDto;
import com.BMS.model.Beneficiary;
import org.springframework.stereotype.Component;

@Component
public class BeneficiaryMapper {
    public BenficiaryDto mapToDto(Beneficiary beneficiary){
        return new BenficiaryDto(beneficiary.getAccount().getAccountNumber(),beneficiary.getIfsccode());
    }
}
