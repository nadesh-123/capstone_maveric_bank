package com.BMS.DTO;

import java.util.List;

public record BranchStatForAdminDto(
        List<String> labels,
        List<Long> branchCount
) {
}
