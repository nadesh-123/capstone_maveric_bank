package com.BMS.repository;

import com.BMS.enums.AccountType;
import com.BMS.enums.Status;
import com.BMS.model.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account,Integer> {

    Page<Account> findByStatus(Status status, Pageable pageable);

    List<Account> findByCustomerId(int customerId);





    List<Account> findByAccounttype(AccountType accountType);

    List<Account> findByCustomerUserId(int id);

    Optional<Account> findByAccountNumber(String s);
}
