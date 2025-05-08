// pages/taskform.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';
import { getToken } from '../utils/auth';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'; // Import Sidebar

const TaskFormPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the task ID from the query parameters
  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchTask = async () => {
    try {
      const token = getToken();
      const res = await api.get(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTask(res.data);
    } catch (err) {
      setError('Failed to fetch task');
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
    if (id) {
      fetchTask();
    }
    fetchUsers();
  }, [id]);

  const handleTaskSubmit = async (taskData) => {
    try {
      const token = getToken();
      if (task) {
        // Update the task
        await api.put(`/tasks/${task._id}`, taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create a new task
        await api.post('/tasks', taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      router.push('/tasklist'); // Redirect back to the task list page
    } catch (err) {
      setError('Failed to save task');
    }
  };

  return (
    <div style={{  }}>
      <Sidebar /> {/* Sidebar */}
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <Navbar />
        <h1>{task ? 'Edit Task' : 'Create Task'}</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TaskForm 
  onSubmit={handleTaskSubmit} 
  initialData={task} 
  users={users} 
  onCancelEdit={() => router.push('/tasklist')} 
/>
      </div>
    </div>
  );
};

export default TaskFormPage;
