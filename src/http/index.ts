import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { AuthResponse } from '../models/response/AuthResponse';

export const API_URL = 'http://EXAMPLE';

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

/* async function refreshToken() {
  // TODO: Выполнить запрос на сервер для обновления токенов
  const response = axios.get<AuthResponse>(`${API_URL}/refresh`, {
    withCredentials: true,
  });
  const { accessToken, lifeTime } = response.data;

  // Сохраняем обновленный токен в localStorage
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('lifeTime', lifeTime);
  // Возвращаем обновленный access token
  return accessToken;
}

// Добавляем request interceptor
$api.interceptors.request.use(
  function (config) {
    // Получаем access token из localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Если access token есть, добавляем его в заголовок Authorization
    if (accessToken) {
      // Декодируем access token для получения времени жизни токена
      const { iat } = jwt_decode(accessToken);
      console.log(iat);
      // Если время жизни токена истекло, обновляем токены
      if (iat < Date.now() * 1000) {
        refreshToken();
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
); */

$api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    const refreshTokenlifeTime = localStorage.getItem('time');
    if (refreshTokenlifeTime && +refreshTokenlifeTime + 5000 < Date.now() / 1000) {
      console.log('отсутствует рефреш токен, либо истек, редирект на логин');
      window.location.href = '/login';
      throw new Error('отсутствует рефреш токен, либо истек, редирект на логин');
    } else if (token && jwt_decode(token).iat + 5000 > Date.now() / 1000) {
      console.log('токен доступа жив, выполняем запрос');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      console.log('токен доступа умер, выполняем рефреш');
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        const newToken = response.data.accessToken;
        localStorage.setItem('token', newToken);
        config.headers.Authorization = `Bearer ${newToken}`;
        return $api.request(config);
      } catch (e) {
        console.log('обновление (рефреш) не удалось, выполняем редирект');
        window.location.href = '/login';
        throw new Error('обновление (рефреш) не удалось, выполняем редирект');
      }
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* Создается экземпляр axios с базовым URL-адресом API сервера и флагом "withCredentials", который позволяет отправлять кросс-доменные запросы с использованием учетных данных.

Затем, используя метод "interceptors.request.use", создается перехватчик запросов, который будет выполняться перед каждым запросом. В этом перехватчике выполняются следующие действия:

Получение токена из локального хранилища браузера.
Проверка времени жизни токена обновления (refresh token), и если оно истекло или токен отсутствует, то происходит редирект на страницу логина и генерируется ошибка.
Если время жизни токена доступа (access token) не истекло, то токен добавляется в заголовок запроса в формате "Bearer <token>" и запрос выполняется.
Если время жизни токена доступа истекло, то выполняется запрос на обновление токена через API сервер, используя токен обновления.
Если обновление токена прошло успешно, то новый токен сохраняется в локальное хранилище браузера и добавляется в заголовок запроса в формате "Bearer <newToken>". Затем выполняется исходный запрос, используя обновленный токен.
Если обновление токена не удалось, то происходит редирект на страницу логина и генерируется ошибка.
Если происходит ошибка во время выполнения запроса, то она перехватывается и передается на обработку дальше. В данном случае, используется метод "Promise.reject", который просто перенаправляет ошибку в следующий блок catch для обработки. */
