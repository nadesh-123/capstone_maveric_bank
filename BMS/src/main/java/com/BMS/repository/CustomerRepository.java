package com.BMS.repository;

import com.BMS.enums.Status;
import com.BMS.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer,Integer> {
    Optional<Customer> findByUserId(int userId);

    Customer findByUserUsername(String username);
@Query("""
        select count(c) from Customer c
        where c.user.status=?1
        """)
    long getAllActive(Status active);

    Page<Customer> findByUserStatus(Status status, Pageable pageable);
}
