package com.BMS.controller;

import com.BMS.DTO.BenficiaryDto;
import com.BMS.service.BenficiaryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
public class BeneficiaryController {
    BenficiaryService benficiaryService;
    @PostMapping("/api/beneficiary/add")
    public void addBeneficiary(@Valid @RequestBody BenficiaryDto benficiaryDto, Principal principal){
        String username=principal.getName();
        benficiaryService.addBenficiary(benficiaryDto,username);
    }
    @GetMapping("/api/beneficiary/get")
    public List<BenficiaryDto> getBeneficiary(Principal principal){
        String username= principal.getName();
     return    benficiaryService.getBeneficiaryByUsername(username);
    }
}
