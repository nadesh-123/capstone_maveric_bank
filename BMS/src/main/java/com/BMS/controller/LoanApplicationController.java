package com.BMS.controller;

import com.BMS.DTO.LoanApplicationDto;
import com.BMS.service.LoanApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@AllArgsConstructor

public class LoanApplicationController {
    LoanApplicationService loanApplicationService;
    @PostMapping("/api/loan-application/apply")
    public void createLoanApplication(@RequestBody  LoanApplicationDto loanApplicationDto){

        loanApplicationService.createLoanApplication(loanApplicationDto);

    }
    @PostMapping("/api/documents/upload/{appId}")
    public void upload(Principal principal,
                       @RequestParam("files") MultipartFile[] files, @PathVariable int appId) throws IOException {

        String username = principal.getName();
        loanApplicationService.upload(username, files,appId);
    }
}
