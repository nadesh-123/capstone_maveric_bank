package com.BMS.DTO;

import com.BMS.enums.Role;

public record CustUserDto(int userId,
                          Role role,
                          String username,
                          int cusId,
                          String  token) {
}
