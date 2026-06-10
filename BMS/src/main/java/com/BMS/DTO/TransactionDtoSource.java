package com.BMS.DTO;
import com.BMS.enums.TransactionType;
import jakarta.validation.constraints.NotNull;

public record TransactionDtoSource(
        @NotNull
        TransactionType transactionType,
                                   String Source_accno,
                                   String Target_accno,
                                   @NotNull
                                   double amount
                                   ) {
}
