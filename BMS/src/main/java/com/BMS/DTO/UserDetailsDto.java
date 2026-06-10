package com.BMS.DTO;

import com.BMS.enums.Role;

public record UserDetailsDto(int userId,
                             String username,
                             Role role) {
}
