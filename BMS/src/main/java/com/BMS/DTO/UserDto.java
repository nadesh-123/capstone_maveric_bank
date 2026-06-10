package com.BMS.DTO;

import com.BMS.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserDto(
        @NotNull
                @NotBlank
        String username,
        @NotNull
        @NotBlank
        String password,
        @NotNull
        @NotBlank
        Role role) {
}
