import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="card text-center">
      <h2 className="text-xl font-semibold mb-2">404 - Không tìm thấy trang</h2>
      <p className="mb-4 opacity-80">Trang bạn truy cập không tồn tại.</p>
      <Link to="/" className="btn">Về trang chủ</Link>
    </div>
  )
}
