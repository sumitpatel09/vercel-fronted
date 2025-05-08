// pages/tasklist.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';
import { getToken } from '../utils/auth';
import TaskList from '../components/TaskList';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const token = getToken();
      const { status } = router.query;
      const query = status ? `?status=${encodeURIComponent(status)}` : '';

      const res = await api.get(`/tasks${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [router.query.status]);

  const handleEdit = (taskId) => {
    router.push(`/taskform?id=${taskId}`);
  };

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    try {
      const token = getToken();
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Refresh task list after deletion
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <Navbar />
        <h1>Task List</h1>
        {router.query.status && (
          <p>
            Filtering by status: <strong>{router.query.status}</strong>
          </p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default TaskListPage;
