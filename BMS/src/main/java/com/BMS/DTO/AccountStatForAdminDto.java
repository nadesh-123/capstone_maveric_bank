package com.BMS.DTO;

import com.BMS.enums.AccountType;

import java.util.List;

public record AccountStatForAdminDto(List<AccountType> labels,
                                     List<Long> accountCount) {
}
