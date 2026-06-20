package com.BMS.DTO;

import com.BMS.enums.Role;
import com.BMS.enums.Status;

public record DtoEmployee(int userId,
                          String name,
                          String email,
                          String username,
                          Status status

                          ) {
}
