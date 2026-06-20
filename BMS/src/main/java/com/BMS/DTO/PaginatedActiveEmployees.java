package com.BMS.DTO;

import java.util.List;

public record PaginatedActiveEmployees(long totalElements, int totalPages, List<DtoEmployee> data) {
}
