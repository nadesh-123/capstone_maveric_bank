package com.BMS.repository;

import com.BMS.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan,Integer> {
}
