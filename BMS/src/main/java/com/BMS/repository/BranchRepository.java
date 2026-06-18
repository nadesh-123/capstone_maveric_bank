package com.BMS.repository;

import com.BMS.DTO.BranchStatDto;
import com.BMS.enums.Location;
import com.BMS.model.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

public interface BranchRepository extends JpaRepository<Branch,Integer> {


    Branch findByLocation(Location location);
    @Query("""
    select new com.BMS.DTO.BranchStatDto(
        a.branch.branchName,
        count(a)
    )
    from Account a
    group by a.branch.branchName
""")
    List<BranchStatDto> getStat();
}
