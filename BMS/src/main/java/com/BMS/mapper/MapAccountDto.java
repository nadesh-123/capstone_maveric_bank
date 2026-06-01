package com.BMS.mapper;

import com.BMS.DTO.AccountDTO;
import com.BMS.DTO.AccountDtoShow;
import com.BMS.model.Account;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class MapAccountDto {

    public AccountDTO mapToDto(Account account){
        Integer employeeid=account.getEmployee()==null?null:account.getEmployee().getId();
        return new AccountDTO(account.getAccno(),
                account.getAccounttype(),
                account.getCustomer().getId(),
                employeeid,
                account.getBranch().getId(),account.getBalance(),
                account.getUpdatedAt(),account.getStatus());
    }
    public AccountDtoShow mapAccountToDto(Account account){
        return  new AccountDtoShow(account.getCustomer().getId(),account.getAccno(),account.getAccounttype(),account.getBranch().getBranchName(),account.getBalance(),account.getStatus())
;    }
}
