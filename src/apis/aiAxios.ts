import axios from 'axios';

const aiAxios = axios.create({
  baseURL: 'http://www.aiary.net/ai_api/',
});

export default aiAxios;