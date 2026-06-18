package com.BMS.controller;

import com.BMS.DTO.EmployeeActionStat;
import com.BMS.DTO.LoanApplicationDto;
import com.BMS.DTO.LoanApplicationDtoPaginated;
import com.BMS.enums.LoanStatus;
import com.BMS.service.LoanApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor

public class LoanApplicationController {
    private final  LoanApplicationService loanApplicationService;
    @PostMapping("/api/loan-application/apply")
    public LoanApplicationDto createLoanApplication(@RequestBody  LoanApplicationDto loanApplicationDto){

      return  loanApplicationService.createLoanApplication(loanApplicationDto);

    }
    @PostMapping("/api/documents/upload/{appId}")
    public void upload(Principal principal,
                       @RequestParam("files") MultipartFile[] files, @PathVariable int appId) throws IOException {

        String username = principal.getName();
        loanApplicationService.upload(username, files,appId);
    }
    @GetMapping("/api/loanApplication-pending")
    public LoanApplicationDtoPaginated allPendingLoanApplications(@RequestParam(defaultValue = "0",required = false) int page, @RequestParam(defaultValue = "10",required = false)int size){

        return loanApplicationService.allPendingLoanApplications(page,size);
    }
    @PutMapping("/api/loan-application/action/{applicationId}")
    public void actionOnLoanApplication(@PathVariable int applicationId,@RequestParam LoanStatus loanStatus,Principal principal){
        String username=principal.getName();
        loanApplicationService.actionOnLoanApplication(loanStatus,username,applicationId);
    }
    @GetMapping("/api/application/stat")
        public EmployeeActionStat applicationActionStat(Principal principal){
        String username=principal.getName();
               return loanApplicationService.applicationActionStat(username);

        }
}
