package com.BMS.model;

import com.BMS.enums.Gender;
import com.BMS.enums.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToOne
    private User user;
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
    @CreationTimestamp
    private Instant createdDate;
    @UpdateTimestamp
    private Instant updatedDate;
    @Enumerated(EnumType.STRING)
    private Status status;



    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", user=" + user +
                ", name='" + name + '\'' +
                ", gender=" + gender +
                ", dob=" + dob +
                ", email='" + email + '\'' +
                ", phonenumber='" + phonenumber + '\'' +
                ", aadharno='" + aadharno + '\'' +
                ", panno='" + panno + '\'' +
                ", createdDate=" + createdDate +
                ", updatedDate=" + updatedDate +
                ", status=" + status +
                '}';
    }
}
