package com.BMS.repository;

import com.BMS.enums.AccountType;
import com.BMS.enums.Status;
import com.BMS.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account,Integer> {

    List<Account> findByStatus(Status status);

    List<Account> findByCustomerId(int customerId);

    Optional<Account> findByAccno(int accNo);



    List<Account> findByAccounttype(AccountType accountType);
}
