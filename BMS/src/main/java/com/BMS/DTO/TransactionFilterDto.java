package com.BMS.DTO;

import com.BMS.enums.TransactionStatus;
import com.BMS.enums.TransactionType;

import java.time.Instant;

public record TransactionFilterDto(TransactionStatus status,

                                   TransactionType type,

                                   String sourceAccount,

                                   String targetAccount,

                                   Double minAmount,

                                   Double maxAmount,

                                   Instant startDate,

                                   Instant endDate) {
}
