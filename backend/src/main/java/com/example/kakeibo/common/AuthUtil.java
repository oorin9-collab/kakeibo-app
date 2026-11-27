package com.example.kakeibo.common;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;

/**
 * 簡易認証（学習用）：
 * ログイン成功後にフロントエンドが保存した user_id を
 * リクエストヘッダー X-User-Id で送る前提とし、無ければ 401 を返す。
 * ※本格運用では Spring Security + セッション/JWT に置き換えること。
 */
public class AuthUtil {
    public static Long requireUserId(HttpServletRequest request) {
        String header = request.getHeader("X-User-Id");
        if (header == null || header.isBlank()) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "ログインが必要です");
        }
        try {
            return Long.parseLong(header);
        } catch (NumberFormatException e) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "ログインが必要です");
        }
    }
}
