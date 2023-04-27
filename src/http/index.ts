import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { AuthResponse } from '../models/response/AuthResponse';

export const API_URL = 'http://EXAMPLE';

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    return match[2];
  }
}

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const token = getCookie('accessToken');
  if (token) {
    const decodedToken = jwt_decode(token);
    if (decodedToken.exp < Date.now() / 1000) {
      // токен просрочен
    } else {
      // токен действителен

      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        return $api.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  }
);

export default $api;
