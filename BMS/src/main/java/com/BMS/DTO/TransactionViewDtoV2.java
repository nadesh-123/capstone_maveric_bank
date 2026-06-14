package com.BMS.DTO;

import java.util.List;

public record TransactionViewDtoV2(
        int totalRecords,
        int totalPages,
        List<TransactionViewDto> data
) {
}
