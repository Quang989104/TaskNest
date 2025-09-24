import React, { useState, useEffect } from 'react'

export default function TodoForm({ onSubmit, initial }) {
  const [title, setTitle] = useState('')
  const [dueAt, setDueAt] = useState('')

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '')
      setDueAt(initial.dueAt ? new Date(initial.dueAt).toISOString().slice(0,16) : '')
    }
  }, [initial])

  const submit = (e) => {
    e.preventDefault()
    onSubmit({
      title: title.trim(),
      dueAt: dueAt ? new Date(dueAt).toISOString() : null,
    })
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block mb-1 text-sm">Tiêu đề *</label>
        <input className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="VD: Học MERN" required />
      </div>
      <div>
        <label className="block mb-1 text-sm">Hạn (tùy chọn)</label>
        <input className="input" type="datetime-local" value={dueAt} onChange={e => setDueAt(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <button className="btn btn-primary" type="submit">Lưu</button>
      </div>
    </form>
  )
}
