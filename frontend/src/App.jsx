import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import RecordForm from './pages/RecordForm.jsx'
import Records from './pages/Records.jsx'
import { isLoggedIn, logout } from './api.js'

// ログインしていない場合はログイン画面へ戻す
function Protected({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />
}

function Header() {
  const navigate = useNavigate()
  if (!isLoggedIn()) return null
  return (
    <header className="header">
      <Link to="/home" className="logo">家計簿簡単アプリ</Link>
      <nav>
        <Link to="/home">ホーム</Link>
        <Link to="/income">収入を記録</Link>
        <Link to="/expense">支出を記録</Link>
        <Link to="/records">収支一覧</Link>
        <button onClick={() => { logout(); navigate('/login') }}>ログアウト</button>
      </nav>
    </header>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Protected><Home /></Protected>} />
          <Route path="/income" element={<Protected><RecordForm type="income" /></Protected>} />
          <Route path="/expense" element={<Protected><RecordForm type="expense" /></Protected>} />
          <Route path="/records" element={<Protected><Records /></Protected>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </>
  )
}
