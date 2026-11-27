package com.example.kakeibo.dto;

public record LoginResponse(
        Long userId,
        String loginId,
        String message
) {}
