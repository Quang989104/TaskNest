import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import todoRouter from './routes/todo.routes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tasknest';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';


app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => res.json({ ok: true, name: 'TaskNest API' }));
app.use('/api/todos', todoRouter);


app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});


mongoose.connect(MONGO_URI).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
}).catch((e) => {
  console.error('Mongo connection error:', e);
  process.exit(1);
});
