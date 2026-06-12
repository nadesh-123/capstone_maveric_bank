package com.BMS.repository;

import com.BMS.model.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BenficiaryRepository extends JpaRepository<Beneficiary,Integer> {
    List<Beneficiary> findByCustomerUserUsername(String username);
}
