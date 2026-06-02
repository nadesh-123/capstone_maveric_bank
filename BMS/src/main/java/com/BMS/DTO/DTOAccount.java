package com.BMS.DTO;

import com.BMS.enums.AccountType;
import jakarta.validation.constraints.NotNull;

public record DTOAccount(
        @NotNull
        AccountType accountType) {
}
