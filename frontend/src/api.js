// バックエンド（Spring Boot）への通信をまとめたファイル
const API_BASE = 'http://localhost:8080'

function authHeaders() {
  const userId = localStorage.getItem('kakeibo_user_id')
  return userId ? { 'X-User-Id': userId } : {}
}

async function request(path, options = {}) {
  const res = await fetch(API_BASE + path, {
    headers: { 'Content-Type': 'application/json', ...authHeaders(), ...(options.headers || {}) },
    ...options
  })
  if (!res.ok) {
    let message = 'エラーが発生しました'
    try {
      const data = await res.json()
      if (data.message) message = data.message
    } catch { /* レスポンスがJSONでない場合は既定の文言を使う */ }
    throw new Error(message)
  }
  return res.status === 204 ? null : res.json()
}

export const api = {
  login: (loginId, password) =>
    request('/login', { method: 'POST', body: JSON.stringify({ loginId, password }) }),
  getSummary: (year, month) => request(`/summary?year=${year}&month=${month}`),
  createIncome: (body) => request('/incomes', { method: 'POST', body: JSON.stringify(body) }),
  createExpense: (body) => request('/expenses', { method: 'POST', body: JSON.stringify(body) }),
  getRecords: (year, month) => request(`/records?year=${year}&month=${month}`),
  updateRecord: (id, body) =>
    request(`/records/${id}`, { method: 'PUT', body: JSON.stringify(body) })
}

export function saveLogin(userId, loginId) {
  localStorage.setItem('kakeibo_user_id', String(userId))
  localStorage.setItem('kakeibo_login_id', loginId)
}
export function logout() {
  localStorage.removeItem('kakeibo_user_id')
  localStorage.removeItem('kakeibo_login_id')
}
export function isLoggedIn() {
  return !!localStorage.getItem('kakeibo_user_id')
}
