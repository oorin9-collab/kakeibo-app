package com.example.kakeibo.repository;

import com.example.kakeibo.model.MoneyRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MoneyRecordRepository extends JpaRepository<MoneyRecord, Long> {

    // 指定した月の収支一覧（日付順）
    List<MoneyRecord> findByUserIdAndRecordDateBetweenOrderByRecordDateAscRecordIdAsc(
            Long userId, LocalDate start, LocalDate end);

    // 指定した月の収入合計 or 支出合計（recordType で切り替える）
    @Query("SELECT COALESCE(SUM(r.amount), 0) FROM MoneyRecord r " +
           "WHERE r.userId = :userId AND r.recordType = :recordType " +
           "AND r.recordDate BETWEEN :start AND :end")
    long sumAmount(@Param("userId") Long userId,
                   @Param("recordType") String recordType,
                   @Param("start") LocalDate start,
                   @Param("end") LocalDate end);
}
