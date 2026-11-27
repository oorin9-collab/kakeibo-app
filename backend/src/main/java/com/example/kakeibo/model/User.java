package com.example.kakeibo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "login_id", nullable = false, unique = true)
    private String loginId;

    // ハッシュ化したパスワードを保存する（平文は保存しない）
    @Column(name = "password", nullable = false)
    private String password;

    public Long getUserId() { return userId; }
    public String getLoginId() { return loginId; }
    public String getPassword() { return password; }
    public void setLoginId(String loginId) { this.loginId = loginId; }
    public void setPassword(String password) { this.password = password; }
}
