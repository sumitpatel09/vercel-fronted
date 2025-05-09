// utils/api.js (frontend)
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vercel-backend-hugo.onrender.com/api', 
});

export default api;
