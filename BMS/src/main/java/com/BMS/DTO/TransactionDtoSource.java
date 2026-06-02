package com.BMS.DTO;
import com.BMS.enums.TransactionType;
import jakarta.validation.constraints.NotNull;

public record TransactionDtoSource(
        @NotNull
        TransactionType transactionType,
                                   int Source_accno,
                                   int Target_accno,
                                   @NotNull
                                   double amount
                                   ) {
}
