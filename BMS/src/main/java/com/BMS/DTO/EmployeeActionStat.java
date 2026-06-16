package com.BMS.DTO;

import java.util.List;

public record EmployeeActionStat(
        List<String> labels,
        List<Integer> data
) {
}
