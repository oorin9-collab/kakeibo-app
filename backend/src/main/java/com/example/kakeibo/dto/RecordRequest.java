package com.example.kakeibo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record RecordRequest(
        @NotNull @Min(1) Integer amount,
        @NotNull LocalDate recordDate,
        String category,
        String memo
) {}
