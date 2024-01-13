import axios from 'axios';
import { updateAccessToken } from './auth';

const baseAxios = axios.create({
  baseURL: 'http://www.aiary.net/api/',
});

baseAxios.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('token');
    if (accessToken != null && config.url !== 'users/reissue') {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    console.log(error);
    return await Promise.reject(error);
  }
);

baseAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      const refreshToken = sessionStorage.getItem('refresh');
      const accessToken = sessionStorage.getItem('token');
      if (refreshToken !== null && accessToken !== null) {
        const data = await updateAccessToken(accessToken, refreshToken);
        const refreshedAccessToken = data.data.access_token;
        const newrefreshedAccessToken = data.data.refresh_token;
        if (
          refreshedAccessToken !== null &&
          refreshedAccessToken !== undefined
        ) {
          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${refreshedAccessToken}`;
          sessionStorage.setItem('token', refreshedAccessToken);
          sessionStorage.setItem('refresh', newrefreshedAccessToken);
          return await baseAxios(originalRequest);
        }
      }
    }
    if (error.response?.status === 403) {
      sessionStorage.clear();
      alert('로그인 정보 만료');
      window.location.href = '/';
    }
    return await Promise.reject(error);
  }
);

export default baseAxios;
