import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'

const yen = (n) => '¥' + Number(n).toLocaleString()

export default function Home() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSummary(year, month)
      .then(setSummary)
      .catch((err) => setError(err.message))
  }, [year, month])

  return (
    <div>
      <h1>ホーム</h1>
      <label>対象年月：
        <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} style={{ width: 90 }} /> 年
        <input type="number" min="1" max="12" value={month} onChange={(e) => setMonth(Number(e.target.value))} style={{ width: 60 }} /> 月
      </label>
      {error && <p className="error">{error}</p>}
      {summary && (
        <div className="summary-row">
          <div className="summary-box income"><span>収入合計</span><strong>{yen(summary.incomeTotal)}</strong></div>
          <div className="summary-box expense"><span>支出合計</span><strong>{yen(summary.expenseTotal)}</strong></div>
          <div className="summary-box balance"><span>収支</span><strong>{yen(summary.balance)}</strong></div>
        </div>
      )}
      <div className="button-row">
        <Link className="btn" to="/income">収入を記録</Link>
        <Link className="btn" to="/expense">支出を記録</Link>
        <Link className="btn" to="/records">収支一覧を見る</Link>
      </div>
    </div>
  )
}
