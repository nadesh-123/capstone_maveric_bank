package com.BMS.controller;

import com.BMS.DTO.AccountDeactivationRequestDto;

import java.util.List;

public record AccountDeactivationPaginated(
        long totalRecords,
        int totalPages,
        List<AccountDeactivationRequestDto> data){
}
