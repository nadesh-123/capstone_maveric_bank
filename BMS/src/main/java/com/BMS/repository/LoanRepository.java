package com.BMS.repository;

import com.BMS.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface LoanRepository extends JpaRepository<Loan,Integer> {
    List<Loan> findByAccountCustomerUserUsername(String username);
}
