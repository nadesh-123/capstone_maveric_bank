package com.BMS.DTO;

import com.BMS.enums.Role;

public record UserDto(String username,
                      String password,
                      Role role) {
}
