import { Router } from 'express';
import { createTodo, listTodos, updateTodo, deleteTodo, toggleTodo, stats } from '../controllers/todo.controller.js';

const router = Router();

router.post('/', createTodo);
router.get('/', listTodos);
router.get('/stats', stats);
router.put('/:id', updateTodo);
router.patch('/:id/toggle', toggleTodo);
router.delete('/:id', deleteTodo);

export default router;
