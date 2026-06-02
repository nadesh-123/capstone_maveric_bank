package com.BMS.DTO;

import com.BMS.enums.Gender;
import com.BMS.enums.Location;
import com.BMS.enums.Role;

import java.time.LocalDate;

public record UserCutomerDto(String username,
                             String password,
                             Role role,
                             String fullname,
                             String email,
                             Gender gender,
                             LocalDate dob,
                             String phonenumber,
                             String aadharno,
                             String panno,
                             Location location) {
}
