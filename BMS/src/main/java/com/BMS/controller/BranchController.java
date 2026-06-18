package com.BMS.controller;

import com.BMS.DTO.BranchDto;
import com.BMS.DTO.BranchStatForAdminDto;
import com.BMS.model.Branch;
import com.BMS.service.BranchService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class BranchController {
    private final  BranchService branchService;
    @GetMapping("/api/branch/getById/{branchId}")
    public BranchDto addBranchById(@PathVariable int branchId){
        return branchService.getBranchById(branchId);
    }

    @DeleteMapping("/api/branch/delete/{branchId}")
    public void removeBranch(@PathVariable int branchId){
        branchService.removeBranch(branchId);
    }

    @GetMapping("/api/branch/getAll")
    public List<BranchDto> getAllBranches(){
        return branchService.getAllBranches();
    }
    @GetMapping("/api/branch/stat")
    public BranchStatForAdminDto getBranchStat(){
       return branchService.getStat();
    }
}
