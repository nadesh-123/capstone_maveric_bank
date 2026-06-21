package com.BMS.DTO;

import com.BMS.enums.Location;

public record BranchDto(int id,
                        String branchName,
                        String location,
                        String ifsccode) {
}
