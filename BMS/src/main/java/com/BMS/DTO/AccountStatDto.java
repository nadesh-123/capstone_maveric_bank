package com.BMS.DTO;

import com.BMS.enums.AccountType;

public record AccountStatDto(AccountType accountType, long count) {
}
