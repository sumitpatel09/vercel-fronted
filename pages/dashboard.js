import { useEffect, useState } from 'react';
import api from '../utils/api';
import { getToken } from '../utils/auth';
import NotificationList from '../components/NotificationList';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const [taskStats, setTaskStats] = useState({
    total: 0,
    assigned: 0,
    completed: 0,
    pending: 0,
  });
  const [error, setError] = useState('');

  const fetchNotifications = async () => {
    try {
      const token = getToken();
      const res = await api.get('/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (err) {
      setError('Failed to fetch notifications');
    }
  };

  const fetchTaskStats = async () => {
    try {
      const token = getToken();
      const res = await api.get('/tasks/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTaskStats(res.data);
    } catch (err) {
      setError('Failed to fetch task stats');
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchTaskStats();
  }, []);

  const handleMarkRead = async (notificationId) => {
    try {
      const token = getToken();
      await api.put(`/notifications/${notificationId}/read`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotifications();
    } catch (err) {
      setError('Failed to mark notification as read');
    }
  };

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <h1>Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="row">
          <DashboardCard color="info" count={taskStats.total} label="Total Tasks" icon="ion-bag" />
          <DashboardCard color="success" count={taskStats.assigned} label="Assigned Tasks" icon="ion-stats-bars" />
          <DashboardCard color="warning" count={taskStats.completed} label="Completed Tasks" icon="ion-person-add" />
          <DashboardCard color="danger" count={taskStats.pending} label="Pending Tasks" icon="ion-pie-graph" />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <NotificationList notifications={notifications} onMarkRead={handleMarkRead} />
      </div>
    </div>
  );
}
const DashboardCard = ({ color, count, label, icon }) => {
  // Remove " Tasks" or " Task" and trim extra spaces
  const status = label.replace(/ Tasks?$/, '').trim();

  // Determine the correct link
  const link =
    status === 'Total' || status === 'Assigned'
      ? '/tasklist'
      : `/tasklist?status=${encodeURIComponent(status)}`;

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className={`card text-white bg-${color} h-100 shadow`}>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <i className={`ion ${icon} mb-3`} style={{ fontSize: '3rem', opacity: 0.7 }}></i>
          <h3 className="card-title">{count}</h3>
          <p className="card-text">{label}</p>
        </div>
        <div className="card-footer text-center">
          <a href={link} className="text-white text-decoration-none">
            More info <i className="fas fa-arrow-circle-right" />
          </a>
        </div>
      </div>
    </div>
  );
};
