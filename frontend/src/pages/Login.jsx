import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, saveLogin } from '../api.js'

export default function Login() {
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const data = await api.login(loginId, password)
      saveLogin(data.userId, data.loginId)
      navigate('/home')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card narrow">
      <h1>家計簿簡単アプリ</h1>
      <form onSubmit={handleSubmit}>
        <label>ログインID
          <input value={loginId} onChange={(e) => setLoginId(e.target.value)} required />
        </label>
        <label>パスワード
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="primary">ログイン</button>
      </form>
      <p className="hint">テスト用：ID「test」／パスワード「test1234」</p>
    </div>
  )
}
