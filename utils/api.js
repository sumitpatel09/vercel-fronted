// utils/api.js (frontend)
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vercel-backend-beryl-nine.vercel.app/api', // ✅ this is correct
});

export default api;
