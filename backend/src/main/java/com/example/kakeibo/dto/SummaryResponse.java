package com.example.kakeibo.dto;

public record SummaryResponse(
        int year,
        int month,
        long incomeTotal,
        long expenseTotal,
        long balance // 収支 = 収入合計 - 支出合計
) {}
