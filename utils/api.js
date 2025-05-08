import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vercel-fronted-nine.vercel.app/api',
});

export default api;
