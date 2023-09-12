import axios from 'axios';

const aiAxios = axios.create({
  baseURL: 'http://localhost:80/ai_api/',
});

export default aiAxios;