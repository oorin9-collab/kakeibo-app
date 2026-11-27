package com.example.kakeibo.controller;

import com.example.kakeibo.common.ApiException;
import com.example.kakeibo.dto.LoginRequest;
import com.example.kakeibo.dto.LoginResponse;
import com.example.kakeibo.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ログイン用API：POST /login（認証不要）
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest req) {
        var user = userRepository.findByLoginId(req.loginId())
                .filter(u -> passwordEncoder.matches(req.password(), u.getPassword()))
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED,
                        "ログインIDまたはパスワードが正しくありません"));
        return new LoginResponse(user.getUserId(), user.getLoginId(), "ログイン成功");
    }
}
