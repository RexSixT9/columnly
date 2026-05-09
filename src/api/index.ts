import axios from 'axios';

export const columnlyApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});
