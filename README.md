TaskNest (MERN)

Dự án mẫu MERN quản lý công việc cá nhân: CRUD + filter + phân trang + thống kê.

0) Cấu trúc & yêu cầu
tasknest/
├─ client/                 # React (Vite + Tailwind)
│  └─ .env.example
├─ server/                 # Express API (MongoDB Atlas)
│  └─ .env.example
└─ README.md


Node.js LTS (18.x/20.x), npm

MongoDB Atlas (khuyến nghị) hoặc MongoDB local

1) Chạy Backend (server)
cd server
cp .env.example .env  # nhớ sửa MONGO_URI nếu dùng Atlas
npm install
npm run dev


Mặc định chạy ở http://localhost:5000

API chính:

POST /api/todos { "title": "Học MERN", "dueAt": "2025-09-30T10:00:00.000Z" }

GET /api/todos?status=false&page=1&limit=5&q=mern

PATCH /api/todos/:id/toggle

PUT /api/todos/:id

DELETE /api/todos/:id

GET /api/todos/stats → { done, undone, total }

2) Chạy Frontend (client)
cd client
npm install
# nếu backend khác origin, tạo file .env và thêm:
# VITE_API_BASE=https://<your-api-host>/api
npm run dev


App chạy ở http://localhost:5173

Mặc định gọi API http://localhost:5000/api

3) Biến môi trường (env)

server/.env.example

PORT=5000
MONGO_URI=YOUR_MONGODB_ATLAS_URI   # ví dụ: mongodb+srv://user:pass@cluster0.xxx.mongodb.net/tasknest
CLIENT_URL=http://localhost:5173


client/.env.example

VITE_API_BASE=http://localhost:5000/api

4) Deploy (tóm tắt)

Backend: Render/Railway

Env: PORT, MONGO_URI, CLIENT_URL (URL frontend)

Frontend: Vercel/Netlify

Env: VITE_API_BASE=https://<api-host>/api

5) API Spec (rút gọn)

Base URL: /api/todos

POST /api/todos → tạo công việc

GET /api/todos?status=&from=&to=&page=&limit=&q= → danh sách + filter + phân trang + tìm kiếm

GET /api/todos/stats → thống kê { done, undone, total }

PUT /api/todos/:id → cập nhật

PATCH /api/todos/:id/toggle → đổi trạng thái

DELETE /api/todos/:id → xoá
