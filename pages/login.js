import { useState } from 'react';
import api from '../utils/api';
import { setToken } from '../utils/auth';
import { useRouter } from 'next/router';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const res = await api.post('/auth/login', formData);
      setToken(res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 auth-bg">
      <div className="card p-4 shadow" style={{ minWidth: '550px' }}>
        <h1 className="mb-4 text-center">Login</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
