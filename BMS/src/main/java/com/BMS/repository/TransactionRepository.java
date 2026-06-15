package com.BMS.repository;

import com.BMS.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Integer>, JpaSpecificationExecutor<Transaction> {


    List<Transaction> findByCustomerId(int id, Pageable pageable);
@Query("""
    SELECT DISTINCT t
    FROM Transaction t
    LEFT JOIN t.targetAccount ta
    WHERE
        t.customer.id = :customerId
        OR ta.customer.id = :customerId
    ORDER BY t.createdAt DESC
""")
Page<Transaction> getAllTransactions(@Param("customerId") int customerId, Pageable pageable);
}
