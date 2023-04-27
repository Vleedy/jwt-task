import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export const API_URL = 'http://EXAMPLE';

function getCookie(name:string) {
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
  config.headers.Authorization = `Bearer ${getCookie('accessToken')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
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
/**
 * find dinozavr
 * @param param  - this is dinozavr
 * @returns - tireks
 */
function ok(param) {
    return param
}