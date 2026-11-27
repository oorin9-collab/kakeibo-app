package com.example.kakeibo.dto;

import com.example.kakeibo.model.MoneyRecord;
import java.time.LocalDate;

public record RecordResponse(
        Long recordId,
        String recordType,
        Integer amount,
        LocalDate recordDate,
        String category,
        String memo
) {
    public static RecordResponse from(MoneyRecord r) {
        return new RecordResponse(r.getRecordId(), r.getRecordType(), r.getAmount(),
                r.getRecordDate(), r.getCategory(), r.getMemo());
    }
}
