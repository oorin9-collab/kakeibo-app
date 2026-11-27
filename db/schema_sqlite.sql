-- 家計簿簡単アプリ DB初期化スクリプト（SQLite版）
-- DB Browser for SQLite の「SQL実行」タブで開いて実行してください。
-- 実行すると users / records の2テーブルと、テスト用データが作られます。
-- ※実行のあと「変更を書き込み」ボタンを押すまでファイルに保存されません。

CREATE TABLE IF NOT EXISTS users (
  user_id  INTEGER PRIMARY KEY AUTOINCREMENT,
  login_id TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS records (
  record_id   INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(user_id),
  record_type TEXT NOT NULL CHECK (record_type IN ('income', 'expense')),
  amount      INTEGER NOT NULL CHECK (amount > 0),
  record_date TEXT NOT NULL,             -- 'YYYY-MM-DD' 形式で保存
  category    TEXT,
  memo        TEXT
);

-- テストユーザー（ログインID: test / パスワード: test1234、BCryptハッシュで保存）
INSERT OR IGNORE INTO users (login_id, password)
VALUES ('test', '$2b$10$7Ms4o52CTZbfv/tWlw.MmOXlTBpgR0aQydmn9RmFui4p8vmrgg2sK');

-- 今月分のサンプル収支（実行した月の1日・2日・3日に入ります）
INSERT INTO records (user_id, record_type, amount, record_date, category, memo)
SELECT user_id, 'income', 250000, date('now', 'start of month'), '給料', '今月の給料'
FROM users WHERE login_id = 'test';

INSERT INTO records (user_id, record_type, amount, record_date, category, memo)
SELECT user_id, 'expense', 3500, date('now', 'start of month', '+1 day'), '食費', 'スーパーの買い物'
FROM users WHERE login_id = 'test';

INSERT INTO records (user_id, record_type, amount, record_date, category, memo)
SELECT user_id, 'expense', 800, date('now', 'start of month', '+2 days'), '交通費', '電車代'
FROM users WHERE login_id = 'test';
