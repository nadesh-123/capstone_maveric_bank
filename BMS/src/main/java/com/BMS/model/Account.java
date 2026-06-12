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
    @Column(name = "account_number", unique = true, nullable = false, length = 8)
    private String accountNumber;
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
