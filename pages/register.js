import { useState } from 'react';
import api from '../utils/api';
import { setToken } from '../utils/auth';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/register', formData);
      setToken(res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-bg">
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px', minHeight: '100vh' }}>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="card p-4 shadow" style={{ minWidth: '350px' }}>
            <h1 className="mb-4 text-center">Register</h1>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success w-100">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
