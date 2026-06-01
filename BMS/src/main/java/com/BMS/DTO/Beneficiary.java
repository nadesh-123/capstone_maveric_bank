package com.BMS.DTO;

import com.BMS.model.Account;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.SequencedSet;
@Entity
@Getter
@Setter
public class Beneficiary {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
   private int id;
    @OneToOne
    private Account account;

    private String ifsccode;

}
