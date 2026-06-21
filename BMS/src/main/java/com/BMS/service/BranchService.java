package com.BMS.service;

import com.BMS.DTO.BranchDto;
import com.BMS.DTO.BranchPostDto;
import com.BMS.DTO.BranchStatDto;
import com.BMS.DTO.BranchStatForAdminDto;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.Location;
import com.BMS.mapper.BranchMapper;
import com.BMS.model.Branch;
import com.BMS.repository.BranchRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BranchService {
BranchRepository branchRepository;
BranchMapper branchMapper;


    public BranchDto getBranchById(int branchId) {
      Branch branch=  branchRepository.findById(branchId).orElseThrow(()->new ResourceNotFoundException("invalid branch id"));
      return branchMapper.branchToDto(branch);
    }

    public void removeBranch(int branchId) {
        branchRepository.delete(branchRepository.findById(branchId).orElseThrow(()->new ResourceNotFoundException("invalid branch id")));
    }

    public Branch getBranchByLocation(String location) {
     Branch branch=   branchRepository.findByLocation(location);
        return branch;
    }

    public List<BranchDto> getAllBranches() {
        List<Branch> list=branchRepository.findAll();
        return list.stream().map(branchMapper::branchToDto).toList();
    }

    public BranchStatForAdminDto getStat() {
      List<BranchStatDto> list= branchRepository.getStat();
      List<String> branchNames=new ArrayList<>();
        List<Long> count=new ArrayList<>();
        list.forEach(k -> {
            branchNames.add(k.label());
            count.add(k.count());
        });
        return new BranchStatForAdminDto(branchNames,count);
    }

    public BranchDto createBranch(BranchPostDto branchPostDto) {
       Branch branch=branchMapper.dtoToBranch(branchPostDto);
       branchRepository.save(branch);

       return branchMapper.branchToDto(branch);
    }
}
