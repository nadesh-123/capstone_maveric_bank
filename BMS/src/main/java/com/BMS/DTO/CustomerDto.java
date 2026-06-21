package com.BMS.DTO;

import com.BMS.enums.Gender;
import com.BMS.enums.Location;

import java.time.LocalDate;

public record CustomerDto(int userid,
                          String fullname,
                          String email,
                          Gender gender,
                          LocalDate dob,
                          String phonenumber,
                          String aadharno,
                          String panno,
                          String location) {
}
/*
* private User user;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private LocalDate dob;

    @Column(nullable = false)
    private String phonenumber;
    private String aadharno;
    private String panno;
*
* */