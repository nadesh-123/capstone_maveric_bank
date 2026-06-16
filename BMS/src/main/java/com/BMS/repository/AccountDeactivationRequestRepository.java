package com.BMS.repository;

import com.BMS.model.AccountDeactivationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccountDeactivationRequestRepository extends JpaRepository<AccountDeactivationRequest,Integer> {
    @Query("""
            select count(ad)  from AccountDeactivationRequest ad
            where ad.employee is null
            """)
    int getRequests();
}
