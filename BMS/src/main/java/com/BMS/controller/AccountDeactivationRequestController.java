package com.BMS.controller;

import com.BMS.service.AccountDeactivationRequestService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AccountDeactivationRequestController {
    private final AccountDeactivationRequestService accountDeactivationRequestService;
    @GetMapping("/api/account/deactivation-request")
    public AccountDeactivationPaginated getAccountDeactivationRequests(@RequestParam(defaultValue = "0" ,required = false) int page,
                                                                       @RequestParam(defaultValue = "5",required = false) int size){
        return accountDeactivationRequestService.getAllRequests(page,size);
    }
}
