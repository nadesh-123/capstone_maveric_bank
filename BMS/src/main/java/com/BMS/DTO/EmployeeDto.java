package com.BMS.DTO;

import com.BMS.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EmployeeDto(
        @NotNull
        @NotBlank
          String name,
        @NotNull
        @NotBlank
          String username,
        @NotNull
        @NotBlank
          String password,
        @NotNull
        @NotBlank
                @Email
          String email,
        @NotNull
        @NotBlank
          String contactno,
          Role role) {
}
