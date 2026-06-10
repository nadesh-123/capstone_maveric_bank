package com.BMS.DTO;

import com.BMS.enums.Location;

public record BranchDto(int id,
                        String branchName,
                        Location location,
                        String ifsccode) {
}
