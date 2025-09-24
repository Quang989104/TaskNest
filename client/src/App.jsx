import React from 'react'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="container">
      <header className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">TaskNest N22DCCN063</h1>
        <p className="text-sm opacity-80">Quản lý công việc cá nhân</p>
      </header>
      <Outlet />
      <footer className="mt-10 text-center opacity-60 text-sm">© {new Date().getFullYear()} TaskNest</footer>
    </div>
  )
}
