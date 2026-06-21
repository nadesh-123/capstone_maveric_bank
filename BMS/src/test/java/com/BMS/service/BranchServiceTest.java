package com.BMS.service;

import com.BMS.DTO.BranchDto;
import com.BMS.DTO.BranchPostDto;
import com.BMS.mapper.BranchMapper;
import com.BMS.model.Branch;
import com.BMS.repository.BranchRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;
@ExtendWith(MockitoExtension.class)
public class BranchServiceTest {
    @Mock
    BranchRepository branchRepository;
BranchMapper branchMapper=new BranchMapper();
    BranchService branchService;
    Branch branch1;
    @BeforeEach
    void setUp() {
        branchService=new BranchService(branchRepository,branchMapper);
    }
    @BeforeEach
    public void loadSampleData(){
        branch1=new Branch();
        branch1.setBranchName("main branch");
        branch1.setIfscCode("IFSC0223");
        branch1.setLocation("CHENNAI");

    }
    @Test
    public void postBranchTest(){
        when(branchRepository.save(any(Branch.class))).thenReturn(branch1);
        BranchPostDto branchPostDto=new BranchPostDto("main branch","IFSC0223","CHENNAI");
       BranchDto branchDto= branchService.createBranch(branchPostDto);
        assertThat(branchDto.branchName()).isEqualToIgnoringCase("main branch");
        verify(branchRepository, times(1)).save(any(Branch.class));
    }

}
