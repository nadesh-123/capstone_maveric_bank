package com.BMS.DTO;

public record EmployeePendingActions(int pendingAccounts,
                                     int pendingAccountDeActivations,
                                     int loanApplications) {
}
