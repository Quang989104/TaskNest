import React, { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

export default function Home() {
  const [items, setItems] = useState([])
  const [stats, setStats] = useState({ done: 0, undone: 0, total: 0 })
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState(null)

  const [formKey, setFormKey] = useState(0)

  const limit = 5

  const query = useMemo(() => {
    const params = new URLSearchParams()
    params.set('page', page)
    params.set('limit', limit)
    if (status !== '') params.set('status', status)
    if (q.trim()) params.set('q', q.trim())
    return params.toString()
  }, [page, status, q])

  const fetchList = async () => {
    const res = await api.get(`/todos?${query}`)
    setItems(res.data.items)
    setPage(res.data.page)
    setPages(res.data.pages)
  }

  const fetchStats = async () => {
    const res = await api.get('/todos/stats')
    setStats(res.data)
  }

  useEffect(() => {
    fetchList()
  }, [query])

  useEffect(() => {
    fetchStats()
  }, [])

  const handleCreate = async (payload) => {
    await api.post('/todos', payload)
    setEditing(null)
    setFormKey((k) => k + 1)       
    await fetchList()
    await fetchStats()
  }

  const handleUpdate = async (payload) => {
    await api.put(`/todos/${editing._id}`, payload)
    setEditing(null)
    setFormKey((k) => k + 1)     
    await fetchList()
    await fetchStats()
  }

  const handleToggle = async (t) => {
    await api.patch(`/todos/${t._id}/toggle`)
    await fetchList()
    await fetchStats()
  }

  const handleDelete = async (t) => {
    if (confirm('Xóa công việc này?')) {
      await api.delete(`/todos/${t._id}`)
      await fetchList()
      await fetchStats()
    }
  }

  const submit = (payload) => {
    if (editing) return handleUpdate(payload)
    return handleCreate(payload)
  }

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Thêm / Sửa công việc</h2>
        {}
        <TodoForm
          key={editing ? editing._id || 'editing' : `new-${formKey}`}
          onSubmit={submit}
          initial={editing}
        />
      </section>

      <section className="card">
        <div className="flex flex-wrap gap-2 items-end justify-between mb-3">
          <div className="flex gap-2">
            <div>
              <label className="block text-sm mb-1">Trạng thái</label>
              <select
                className="select"
                value={status}
                onChange={(e) => {
                  setPage(1)
                  setStatus(e.target.value)
                }}
              >
                <option value="">Tất cả</option>
                <option value="false">Chưa hoàn thành</option>
                <option value="true">Đã hoàn thành</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Tìm kiếm</label>
              <input
                className="input"
                placeholder="Nhập từ khóa..."
                value={q}
                onChange={(e) => {
                  setPage(1)
                  setQ(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="text-sm opacity-80">
            <div>
              Tổng: <b>{stats.total}</b> • Done: <b>{stats.done}</b> • Undone:{' '}
              <b>{stats.undone}</b>
            </div>
          </div>
        </div>

        <TodoList
          items={items}
          onToggle={handleToggle}
          onEdit={setEditing}
          onDelete={handleDelete}
        />

        <div className="mt-4 flex items-center justify-between">
          <button
            className="btn"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Trước
          </button>
          <div className="text-sm opacity-70">
            Trang {page}/{pages}
          </div>
          <button
            className="btn"
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Sau →
          </button>
        </div>
      </section>
    </div>
  )
}
