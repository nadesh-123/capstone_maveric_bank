package com.BMS.DTO;

import com.BMS.enums.AccountType;
import com.BMS.enums.Status;

public record AccountDtoShow(int customerId,
            String accountNumber,
         AccountType accountType,
                             String branchName,
         double balance,
         Status status
                             ) {

}
