package com.example.kakeibo.common;

import org.springframework.http.HttpStatus;

// APIのエラーをステータスコード付きで表す例外
public class ApiException extends RuntimeException {
    private final HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() { return status; }
}
