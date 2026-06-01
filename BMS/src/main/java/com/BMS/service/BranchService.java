package com.BMS.service;

import com.BMS.DTO.BranchDto;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.Location;
import com.BMS.mapper.BranchMapper;
import com.BMS.model.Branch;
import com.BMS.repository.BranchRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BranchService {
BranchRepository branchRepository;
BranchMapper branchMapper;
    public Branch getBranchByName(String branchName) {
      Branch branch= branchRepository.findByBranchName(branchName).orElseThrow(()->new ResourceNotFoundException("no branch is asigned to account"));
       return branch;
    }

    public BranchDto getBranchById(int branchId) {
      Branch branch=  branchRepository.findById(branchId).orElseThrow(()->new ResourceNotFoundException("invalid branch id"));
      return branchMapper.branchToDto(branch);
    }

    public void removeBranch(int branchId) {
        branchRepository.delete(branchRepository.findById(branchId).orElseThrow(()->new ResourceNotFoundException("invalid branch id")));
    }

    public Branch getBranchByLocation(Location location) {
     Branch branch=   branchRepository.findByLocation(location);
        return branch;
    }
}
