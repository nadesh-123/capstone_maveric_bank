package com.BMS.repository;

import com.BMS.enums.LoanStatus;
import com.BMS.model.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanApplicationRepository  extends JpaRepository<LoanApplication,Integer> {
    List<LoanApplication> findByLoanStatus(LoanStatus loanStatus);
}
