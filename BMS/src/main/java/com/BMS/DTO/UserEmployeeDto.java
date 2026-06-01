package com.BMS.DTO;

import com.BMS.enums.Role;

public record UserEmployeeDto(int userId,
                              Role role,
                              String username,

                              String  token)  {
}
