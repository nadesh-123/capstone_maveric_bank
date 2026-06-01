package com.BMS.DTO;

import com.BMS.enums.Role;

public record EmployeeDto(String name,
                          String username,
                          String password,
                          String email,
                          String contactno,
                          Role role) {
}
