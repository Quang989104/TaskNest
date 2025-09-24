# TaskNest (MERN)

Dự án mẫu MERN quản lý công việc cá nhân: CRUD + filter + phân trang + thống kê.

## 1) Chạy Backend (server)
```bash
cd server
cp .env.example .env  # nhớ sửa MONGO_URI nếu dùng Atlas
npm install
npm run dev
```
- Mặc định chạy ở `http://localhost:5000`
- API chính:
  - `POST /api/todos` `{ "title": "Học MERN", "dueAt": "2025-09-30T10:00:00.000Z" }`
  - `GET /api/todos?status=false&page=1&limit=5&q=mern`
  - `PATCH /api/todos/:id/toggle`
  - `PUT /api/todos/:id`
  - `DELETE /api/todos/:id`
  - `GET /api/todos/stats` → `{ done, undone, total }`

## 2) Chạy Frontend (client)
```bash
cd client
npm install
# nếu backend khác origin, tạo file .env và thêm:
# VITE_API_BASE=https://<your-api-host>/api
npm run dev
```
- App chạy ở `http://localhost:5173`
- Mặc định gọi API `http://localhost:5000/api`

## 3) Deploy (tóm tắt)
- Backend: Render/Railway
  - Env: `PORT`, `MONGO_URI`, `CLIENT_URL` (URL frontend)
- Frontend: Vercel/Netlify
  - Env: `VITE_API_BASE=https://<api-host>/api`

## 4) Gợi ý báo cáo
- Mục tiêu, phạm vi
- Kiến trúc MERN & flow request
- Thiết kế CSDL (schema `Todo`)
- API Spec (bảng endpoint, tham số)
- Chức năng đã làm (CRUD, filter, phân trang, thống kê)
- Hạn chế & hướng phát triển (auth, đa người dùng, dueAt reminders, export CSV)
