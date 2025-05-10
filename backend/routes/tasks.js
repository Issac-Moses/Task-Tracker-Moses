const express = require('express');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// CRUD operations
router.get('/', authenticate, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

router.post('/', authenticate, async (req, res) => {
  const newTask = new Task({ ...req.body, userId: req.user.id });
  await newTask.save();
  res.status(201).json(newTask);
});

router.put('/:id', authenticate, async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

router.delete('/:id', authenticate, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;