package com.BMS.DTO;

import com.BMS.enums.Status;

public record CustomerForAdminDto(int userId,
                                  String name,
                                  String username,
                                  String email,
                                  Status status
                                  ) {
}
