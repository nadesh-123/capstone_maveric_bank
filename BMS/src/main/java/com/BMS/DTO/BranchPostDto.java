package com.BMS.DTO;

import com.BMS.enums.Location;

public record BranchPostDto(String branchName,
                            String location,
                            String ifsccode) {
}
