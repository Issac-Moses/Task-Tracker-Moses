import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://your-backend.onrender.com/tasks', {
        headers: { Authorization: token },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'https://your-backend.onrender.com/tasks',
        { title: newTask },
        { headers: { Authorization: token } }
      );
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <input
        type="text"
        placeholder="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
