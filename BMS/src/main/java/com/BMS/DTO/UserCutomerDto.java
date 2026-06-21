package com.BMS.DTO;

import com.BMS.enums.Gender;
import com.BMS.enums.Location;
import com.BMS.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record UserCutomerDto(
        @NotNull
        @NotBlank
         String username,
        @NotNull
        @NotBlank
         String password,

        @NotNull
        @NotBlank
         String fullname,
        @NotNull
        @NotBlank
         String email,
        @NotNull

         Gender gender,
        @NotNull

         LocalDate dob,
        @NotNull
        @NotBlank
         String phonenumber,
        @NotNull
        @NotBlank
         String aadharno,
        @NotNull
        @NotBlank
         String panno,
        @NotNull

         String  location) {
}
