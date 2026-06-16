package com.BMS.repository;

import com.BMS.enums.LoanStatus;
import com.BMS.model.LoanApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LoanApplicationRepository  extends JpaRepository<LoanApplication,Integer> {
    @Query("""
    select la from LoanApplication la
    where la.loanStatus in (?1, ?2)
    """)
    Page<LoanApplication> findByStatus(LoanStatus status1, LoanStatus status2, Pageable pageable);
@Query("""
        select count(la) from LoanApplication la
        where la.loanStatus=?1 and la.employee.id=?2
        """)
    int approvedCount(LoanStatus status, int id);
    @Query("""
        select count(la) from LoanApplication la
        where la.loanStatus=?1 and la.employee.id=?2
        """)
    int rejectedCount(LoanStatus loanStatus, int id);
@Query("""
        select count(la) from LoanApplication la
        where la.employee is null
        """)
    int getRequests();
}
