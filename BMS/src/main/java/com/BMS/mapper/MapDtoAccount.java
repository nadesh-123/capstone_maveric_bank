package com.BMS.mapper;

import com.BMS.DTO.DTOAccount;
import com.BMS.model.Account;
import org.springframework.stereotype.Component;

@Component
public class MapDtoAccount {
    public Account mapDtoAccount(DTOAccount dtoAccount){
        Account account=new Account();
        account.setAccounttype(dtoAccount.accountType());
        return account;
    }
}
