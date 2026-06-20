package com.BMS.DTO;

import java.util.List;

public record PaginatedCustomers(long totalElements, int totalPages, List<CustomerForAdminDto> data) {
}
