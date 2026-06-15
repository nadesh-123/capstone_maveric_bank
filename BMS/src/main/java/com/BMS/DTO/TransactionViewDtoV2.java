package com.BMS.DTO;

import java.util.List;

public record TransactionViewDtoV2(
        long totalRecords,
        int totalPages,
        List<TransactionViewDto> data
) {
}
