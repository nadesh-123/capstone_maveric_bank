package com.BMS.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Beneficiary {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
   private int id;
    @ManyToOne
    private Account account;

    private String ifsccode;

    @ManyToOne
    private Customer customer;
}
