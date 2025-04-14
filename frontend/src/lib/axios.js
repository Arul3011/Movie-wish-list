import axios from 'axios';

const api = axios.create({
  baseURL: 'https://3000-yourname-yourrepo.codespaces.github.dev/api',
  withCredentials: true
});

export default api;
