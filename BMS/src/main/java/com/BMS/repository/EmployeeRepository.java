package com.BMS.repository;

import com.BMS.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,Integer> {
    Optional<Employee> findByName(String name);
@Query("""
        select e from Employee e 
        where e.user.username=?1
        """)
    Employee findByEmpUserName(String username);

    Employee findByUserUsername(String username);
}
