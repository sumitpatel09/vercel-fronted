// utils/api.js (frontend)
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vercel-backend-8tx9.onrender.com/api', 
});

export default api;
