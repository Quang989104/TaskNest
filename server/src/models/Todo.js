import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  status: { type: Boolean, default: false }, // false = not done, true = done
  dueAt: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model('Todo', TodoSchema);
