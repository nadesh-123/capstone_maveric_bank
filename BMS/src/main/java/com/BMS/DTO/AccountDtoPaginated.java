package com.BMS.DTO;

import java.util.List;

public record AccountDtoPaginated(Long totalRecords,
                                  int totalPages,
                                  List<AccountDTO> accounts) {

}
