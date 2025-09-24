import Todo from '../models/Todo.js';

// Create
export const createTodo = async (req, res, next) => {
  try {
    const { title, dueAt } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const todo = await Todo.create({ title: title.trim(), dueAt: dueAt || null });
    res.status(201).json(todo);
  } catch (e) { next(e); }
};

// List with filters + pagination
export const listTodos = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10, from, to, q } = req.query;

    const filter = {};
    if (status === 'true' || status === 'false') {
      filter.status = status === 'true';
    }
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }
    if (q) {
      filter.title = { $regex: q, $options: 'i' };
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      Todo.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Todo.countDocuments(filter)
    ]);

    res.json({
      items,
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    });
  } catch (e) { next(e); }
};

// Update
export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, status, dueAt } = req.body;
    const payload = {};
    if (typeof title === 'string') payload.title = title.trim();
    if (typeof status === 'boolean') payload.status = status;
    if (typeof dueAt !== 'undefined') payload.dueAt = dueAt || null;

    const updated = await Todo.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return res.status(404).json({ message: 'Todo not found' });
    res.json(updated);
  } catch (e) { next(e); }
};

// Delete
export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Deleted', id });
  } catch (e) { next(e); }
};

// Toggle status convenience endpoint
export const toggleTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    todo.status = !todo.status;
    await todo.save();
    res.json(todo);
  } catch (e) { next(e); }
};

// Stats
export const stats = async (req, res, next) => {
  try {
    const result = await Todo.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const done = result.find(r => r._id === true)?.count || 0;
    const undone = result.find(r => r._id === false)?.count || 0;
    res.json({ done, undone, total: done + undone });
  } catch (e) { next(e); }
};
