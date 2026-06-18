package com.BMS.repository;

import com.BMS.DTO.AccountStatDto;
import com.BMS.enums.AccountType;
import com.BMS.enums.Status;
import com.BMS.model.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account,Integer> {

    Page<Account> findByStatus(Status status, Pageable pageable);

    List<Account> findByCustomerId(int customerId);


    List<Account> findByAccounttype(AccountType accountType);

    List<Account> findByCustomerUserId(int id);

    Optional<Account> findByAccountNumber(String s);

    @Query("""
                select count(a) 
                from Account a
                where a.status = :status and a.employee.id = :empId
            """)
    int countActiveAccountsByEmployee(@Param("status") Status status,
                                      @Param("empId") int empId);
    @Query("""
                select count(a) 
                from Account a
                where a.status = :status and a.employee.id = :empId
            """)
    int countInActiveAccountsByEmployee(@Param("status") Status status,
                                        @Param("empId") int empId);
    @Query("""
    select count(a)
    from Account a
    where a.employee is null
""")
    int getAccountRequestCount();
@Query("""
        select a from Account a
        where a.status=?1 and a.employee is null
        """)
    Page<Account> findByStatusEmpNull(Status status, Pageable pageable);
    @Query("""
    select a.accounttype  
    from Account a
    where a.customer.user.username = :username
      and (a.status = :status or a.employee is null)
""")
    List<AccountType> findAllowedAccounts(@Param("status") Status status,
                                          @Param("username") String username);
    @Query("""
    select new com.BMS.DTO.AccountStatDto(
        a.accounttype,
        count(a)
    )
    from Account a where a.status=?1
    group by a.accounttype
""")
    List<AccountStatDto> getStat(Status active);
@Query("""
        select count(a) from Account a
        where a.status=?1
        """)
    long getTotalActiveCount(Status active);
}