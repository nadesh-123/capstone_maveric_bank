package com.BMS.DTO;

import com.BMS.enums.AccountType;
import com.BMS.enums.Status;
import com.BMS.model.Customer;
import com.BMS.model.Employee;

import java.time.Instant;

public record AccountDTO(int accno,
                               AccountType accountType,
                               int cusId,
                         Integer employeeId,
                         Integer branchId,
                         Double balance,
                         Instant updatedAt,
                         Status status) {
}
