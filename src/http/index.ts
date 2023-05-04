import axios from 'axios';
import tokenService from '../services/tokenService';

const API_URL = 'http:/*localhost:5000';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(async (config) => {
  const { token, time } = tokenService.getItems(); //Получаем токен доступа и время жизни рефреш токена из локального хранилища*/

  if (tokenService.accessTokenIsValid(token)) {
    config.headers.Authorization = `Bearer ${token}`; //Токен доступа жив? => выполняем запарос, цепляя токен доступа в заголовок*/
    return config;
  }

  if (!tokenService.refreshTokenIsValid(time)) {
    tokenService.removeItems(); //Рефреш токен отсутствует/просрочен? => удаляем старый токен и время рефреш токена из локального хранилища
    window.location.href = '/login'; //Редирект на страницу логина
    return config;
  }

  await tokenService.refreshTokens(); /*Токен доступа просрочен, а рефреш токен жив => выполняем обновление токенов*/
  return config;
});

export default $api;
