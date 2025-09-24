import React from 'react'

export default function TodoList({ items, onToggle, onEdit, onDelete }) {
  if (!items?.length) return <p className="opacity-70">Chưa có công việc.</p>

  return (
    <ul className="space-y-2">
      {items.map(t => (
        <li key={t._id} className="card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={!!t.status} onChange={() => onToggle(t)} />
            <div>
              <div className={"font-medium " + (t.status ? "line-through opacity-60" : "")}>{t.title}</div>
              <div className="text-xs opacity-70">
                Tạo: {new Date(t.createdAt).toLocaleString()} {t.dueAt ? `• Hạn: ${new Date(t.dueAt).toLocaleString()}` : ""}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn" onClick={() => onEdit(t)}>Sửa</button>
            <button className="btn" onClick={() => onDelete(t)}>Xóa</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
