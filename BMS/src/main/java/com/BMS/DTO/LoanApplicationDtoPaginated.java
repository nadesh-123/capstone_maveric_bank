package com.BMS.DTO;

import java.util.List;

public record LoanApplicationDtoPaginated(Long totalRecords, int totalPages,
                                          List<LoanApplicationDto> data) {
}
