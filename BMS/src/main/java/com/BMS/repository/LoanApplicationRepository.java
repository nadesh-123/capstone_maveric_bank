package com.BMS.repository;

import com.BMS.enums.LoanStatus;
import com.BMS.model.LoanApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanApplicationRepository  extends JpaRepository<LoanApplication,Integer> {
    Page<LoanApplication> findByLoanStatus(LoanStatus loanStatus, Pageable pageable);
}
