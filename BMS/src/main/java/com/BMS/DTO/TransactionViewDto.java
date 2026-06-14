package com.BMS.DTO;

import com.BMS.enums.TransactionStatus;
import com.BMS.enums.TransactionType;
import com.BMS.model.Account;

import java.time.Instant;

public record TransactionViewDto(int id,
                                 TransactionStatus transactionStatus,
                                 TransactionType transactionType,
                                 Instant madeAt,
                                 double amount,
                                 String source_account,
                                 String target_account,
                                 Integer customerId
                                 ) {
}
