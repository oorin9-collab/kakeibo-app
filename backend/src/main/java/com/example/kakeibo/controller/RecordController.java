package com.example.kakeibo.controller;

import com.example.kakeibo.common.ApiException;
import com.example.kakeibo.common.AuthUtil;
import com.example.kakeibo.dto.RecordRequest;
import com.example.kakeibo.dto.RecordResponse;
import com.example.kakeibo.dto.SummaryResponse;
import com.example.kakeibo.model.MoneyRecord;
import com.example.kakeibo.repository.MoneyRecordRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@RestController
public class RecordController {
    private final MoneyRecordRepository recordRepository;

    public RecordController(MoneyRecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    // 収支情報取得API：GET /summary?year=2026&month=11
    @GetMapping("/summary")
    public SummaryResponse summary(@RequestParam int year, @RequestParam int month,
                                   HttpServletRequest request) {
        Long userId = AuthUtil.requireUserId(request);
        YearMonth ym = YearMonth.of(year, month);
        long income = recordRepository.sumAmount(userId, MoneyRecord.TYPE_INCOME, ym.atDay(1), ym.atEndOfMonth());
        long expense = recordRepository.sumAmount(userId, MoneyRecord.TYPE_EXPENSE, ym.atDay(1), ym.atEndOfMonth());
        return new SummaryResponse(year, month, income, expense, income - expense);
    }

    // 収入登録API：POST /incomes（201）
    @PostMapping("/incomes")
    @ResponseStatus(HttpStatus.CREATED)
    public RecordResponse createIncome(@Valid @RequestBody RecordRequest req, HttpServletRequest request) {
        return create(req, MoneyRecord.TYPE_INCOME, AuthUtil.requireUserId(request));
    }

    // 支出登録API：POST /expenses（201）
    @PostMapping("/expenses")
    @ResponseStatus(HttpStatus.CREATED)
    public RecordResponse createExpense(@Valid @RequestBody RecordRequest req, HttpServletRequest request) {
        return create(req, MoneyRecord.TYPE_EXPENSE, AuthUtil.requireUserId(request));
    }

    private RecordResponse create(RecordRequest req, String type, Long userId) {
        MoneyRecord r = new MoneyRecord();
        r.setUserId(userId);
        r.setRecordType(type);
        r.setAmount(req.amount());
        r.setRecordDate(req.recordDate());
        r.setCategory(req.category());
        r.setMemo(req.memo());
        return RecordResponse.from(recordRepository.save(r));
    }

    // 収支一覧取得API：GET /records?year=2026&month=11
    @GetMapping("/records")
    public List<RecordResponse> records(@RequestParam int year, @RequestParam int month,
                                        HttpServletRequest request) {
        Long userId = AuthUtil.requireUserId(request);
        YearMonth ym = YearMonth.of(year, month);
        return recordRepository
                .findByUserIdAndRecordDateBetweenOrderByRecordDateAscRecordIdAsc(userId, ym.atDay(1), ym.atEndOfMonth())
                .stream().map(RecordResponse::from).toList();
    }

    // 収支情報更新API：PUT /records/{id}
    @PutMapping("/records/{id}")
    public RecordResponse update(@PathVariable Long id, @Valid @RequestBody RecordRequest req,
                                 HttpServletRequest request) {
        Long userId = AuthUtil.requireUserId(request);
        MoneyRecord r = recordRepository.findById(id)
                .filter(rec -> rec.getUserId().equals(userId))
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "対象データがありません"));
        r.setAmount(req.amount());
        r.setRecordDate(req.recordDate());
        r.setCategory(req.category());
        r.setMemo(req.memo());
        return RecordResponse.from(recordRepository.save(r));
    }
}
