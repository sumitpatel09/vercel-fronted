// pages/tasks.js
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { getToken } from '../utils/auth';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'; // Import Sidebar

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const token = getToken();
      const res = await api.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  const fetchUsers = async () => {
    try {
      const token = getToken();
      const res = await api.get('/auth/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      // Ignore error, users list optional
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const handleTaskSubmit = async (taskData) => {
    try {
      const token = getToken();
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingTask(null);
      } else {
        await api.post('/tasks', taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchTasks();
    } catch (err) {
      setError('Failed to save task');
    }
  };
  const handleCancelEdit = () => {
    setEditingTask(null);
  };
  const handleDelete = async (taskId) => {
    try {
      const token = getToken();
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar /> {/* Sidebar */}
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <Navbar />
        <h1>Task List</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TaskForm
  onSubmit={handleTaskSubmit}
  initialData={editingTask}
  users={users}
  onCancelEdit={handleCancelEdit}
/>
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default TasksPage;
