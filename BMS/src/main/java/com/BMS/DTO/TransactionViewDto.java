package com.BMS.DTO;

import com.BMS.enums.TransactionStatus;

public record TransactionViewDto(int id,
                                 TransactionStatus transactionStatus
                                 ) {
}
