import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api.js'

// 収入・支出で共通の記録フォーム（type で切り替える）
export default function RecordForm({ type }) {
  const isIncome = type === 'income'
  const today = new Date().toISOString().slice(0, 10)
  const [recordDate, setRecordDate] = useState(today)
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [memo, setMemo] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const body = { amount: Number(amount), recordDate, category: category || null, memo: memo || null }
    try {
      if (isIncome) await api.createIncome(body)
      else await api.createExpense(body)
      navigate('/home')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card narrow">
      <h1>{isIncome ? '収入を記録' : '支出を記録'}</h1>
      <form onSubmit={handleSubmit}>
        <label>日付
          <input type="date" value={recordDate} onChange={(e) => setRecordDate(e.target.value)} required />
        </label>
        <label>金額（円）
          <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </label>
        <label>カテゴリ{isIncome ? '' : '（食費・交通費など）'}
          <input value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>メモ
          <input value={memo} onChange={(e) => setMemo(e.target.value)} />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="primary">登録する</button>
        <button type="button" onClick={() => navigate('/home')}>ホームへ戻る</button>
      </form>
    </div>
  )
}
