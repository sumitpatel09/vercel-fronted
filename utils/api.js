import axios from 'axios';
const api = axios.create({
  baseURL: 'vercel-backend-beryl-nine.vercel.app/api', // ✅ correct (replace with your backend URL)
});

export default api;
