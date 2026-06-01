package com.BMS.model;

import com.BMS.enums.AccountType;
import com.BMS.enums.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
@Entity
@Getter
@Setter
public class Account {
    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accno;
    @ManyToOne
    private Customer customer;
    @ManyToOne
    private Employee employee;
    @Enumerated(EnumType.STRING)
    private AccountType accounttype;
    @ManyToOne
   private Branch branch;
    private Double balance;
    @CreationTimestamp
    private Instant createdAt;
    @UpdateTimestamp
    private Instant updatedAt;
    @Enumerated(EnumType.STRING)
    private Status status;

}
