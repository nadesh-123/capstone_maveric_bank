package com.BMS.DTO;

import java.time.Instant;

public record AccountDeactivationRequestDto(int id,
                                            String accountNumber,
                                            String username,
                                            Instant createdAt) {
}
