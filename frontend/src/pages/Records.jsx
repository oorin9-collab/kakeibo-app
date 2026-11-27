import { useEffect, useState } from 'react'
import { api } from '../api.js'

const yen = (n) => '¥' + Number(n).toLocaleString()

export default function Records() {
  const now = new Date()
  const [year] = useState(now.getFullYear())
  const [month] = useState(now.getMonth() + 1)
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // 編集中のレコード

  function load() {
    api.getRecords(year, month).then(setRecords).catch((err) => setError(err.message))
  }
  useEffect(load, [])

  async function handleUpdate(e) {
    e.preventDefault()
    try {
      await api.updateRecord(editing.recordId, {
        amount: Number(editing.amount),
        recordDate: editing.recordDate,
        category: editing.category || null,
        memo: editing.memo || null
      })
      setEditing(null)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(r) {
    if (!window.confirm('この記録を削除しますか？')) return
    try {
      await api.deleteRecord(r.recordId)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h1>収支一覧（{year}年{month}月）</h1>
      {error && <p className="error">{error}</p>}
      <table className="table">
        <thead>
          <tr><th>日付</th><th>区分</th><th>カテゴリ</th><th>金額</th><th>メモ</th><th></th></tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.recordId}>
              <td>{r.recordDate}</td>
              <td>{r.recordType === 'income' ? '収入' : '支出'}</td>
              <td>{r.category || ''}</td>
              <td className="num">{yen(r.amount)}</td>
              <td>{r.memo || ''}</td>
              <td><button onClick={() => setEditing({ ...r })}>編集</button>{' '}<button onClick={() => handleDelete(r)}>削除</button></td>
            </tr>
          ))}
          {records.length === 0 && <tr><td colSpan="6">この月の記録はありません</td></tr>}
        </tbody>
      </table>

      {editing && (
        <div className="dialog-backdrop">
          <div className="dialog">
            <h2>収支を編集</h2>
            <form onSubmit={handleUpdate}>
              <label>日付
                <input type="date" value={editing.recordDate}
                  onChange={(e) => setEditing({ ...editing, recordDate: e.target.value })} required />
              </label>
              <label>金額（円）
                <input type="number" min="1" value={editing.amount}
                  onChange={(e) => setEditing({ ...editing, amount: e.target.value })} required />
              </label>
              <label>カテゴリ
                <input value={editing.category || ''}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
              </label>
              <label>メモ
                <input value={editing.memo || ''}
                  onChange={(e) => setEditing({ ...editing, memo: e.target.value })} />
              </label>
              <div className="button-row">
                <button type="submit" className="primary">更新する</button>
                <button type="button" onClick={() => setEditing(null)}>キャンセル</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
