package com.BMS.model;

import com.BMS.enums.Designation;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToOne
    private User user;
    @Column(nullable = false)
    private  String name;
    private String email;
    @Column(length=10)
    private String contactno;



}
