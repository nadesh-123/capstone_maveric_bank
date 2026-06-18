package com.BMS.DTO;

import com.BMS.enums.AccountType;

import java.util.List;

public record AccountAllowedDto(List<AccountType> accountTypeList) {
}
