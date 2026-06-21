package com.BMS.mapper;

import com.BMS.DTO.BranchDto;
import com.BMS.DTO.BranchPostDto;
import com.BMS.model.Branch;
import org.springframework.stereotype.Component;

@Component
public class BranchMapper {
    public BranchDto branchToDto(Branch branch){
        return new BranchDto(branch.getId(),branch.getBranchName(),branch.getLocation(),branch.getIfscCode());
    }
    public Branch dtoToBranch(BranchPostDto b){
    Branch branch=new Branch();
    branch.setBranchName(b.branchName());
    branch.setIfscCode(b.ifsccode());
    branch.setLocation(b.location());
    return  branch;
    }
}
