package com.BMS.repository;

import com.BMS.model.Branch;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface BranchRepository extends JpaRepository<Branch,Integer> {
    Optional<Branch>  findByBranchName(String branchId);
}
