package com.BMS.repository;

import com.BMS.model.Account;
import com.BMS.model.AccountDeactivationRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccountDeactivationRequestRepository extends JpaRepository<AccountDeactivationRequest,Integer> {
    @Query("""
            select count(ad)  from AccountDeactivationRequest ad
            where ad.employee is null
            """)
    int getRequests();
@Query("""
       select ad  from AccountDeactivationRequest ad
            where ad.employee is null
        """)
    Page<AccountDeactivationRequest> getAllPendingrequests(Pageable pageable);

    AccountDeactivationRequest findByAccount(Account account);
}
