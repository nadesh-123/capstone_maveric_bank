package com.BMS.model;

import com.BMS.enums.Location;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@ToString
public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String branchName;

   private String location;
    @Column(nullable = false)
    private String ifscCode;


}
