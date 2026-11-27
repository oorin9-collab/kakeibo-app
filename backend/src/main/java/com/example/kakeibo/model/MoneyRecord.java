package com.example.kakeibo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "records")
public class MoneyRecord {
    public static final String TYPE_INCOME = "income";
    public static final String TYPE_EXPENSE = "expense";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Long recordId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "record_type", nullable = false)
    private String recordType; // income / expense

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "record_date", nullable = false)
    private LocalDate recordDate;

    @Column(name = "category")
    private String category;

    @Column(name = "memo")
    private String memo;

    public Long getRecordId() { return recordId; }
    public Long getUserId() { return userId; }
    public String getRecordType() { return recordType; }
    public Integer getAmount() { return amount; }
    public LocalDate getRecordDate() { return recordDate; }
    public String getCategory() { return category; }
    public String getMemo() { return memo; }

    public void setUserId(Long userId) { this.userId = userId; }
    public void setRecordType(String recordType) { this.recordType = recordType; }
    public void setAmount(Integer amount) { this.amount = amount; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }
    public void setCategory(String category) { this.category = category; }
    public void setMemo(String memo) { this.memo = memo; }
}
