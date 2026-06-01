package com.BMS.mapper;

import com.BMS.DTO.BranchDto;
import com.BMS.model.Branch;
import org.springframework.stereotype.Component;

@Component
public class BranchMapper {
    public BranchDto branchToDto(Branch branch){
        return new BranchDto(branch.getId(),branch.getBranchName(),branch.getLocation(),branch.getIfscCode());
    }
}
