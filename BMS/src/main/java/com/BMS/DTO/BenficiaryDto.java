package com.BMS.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BenficiaryDto(@NotNull
                           @NotBlank
                            String ifsccode) {
}
