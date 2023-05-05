import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../models/response/AuthResponse';
import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { Nulleble } from '../types/TotalTypes';

const REFRESH_THRESHOLD = 5000;

const tokenService = {
  refreshTokenIsValid(time: Nulleble<string>) {
    return !(!time || +time + REFRESH_THRESHOLD < Date.now() / 1000);
  },
  accessTokenIsValid(token: Nulleble<string>) {
    return !(!token || jwt_decode<DecodedToken>(token).iat + REFRESH_THRESHOLD < Date.now() / 1000);
  },
  async refreshTokens() {
    try {
      const response = await axios.get<AuthResponse>('http://localhost:5000/refresh', {
        withCredentials: true,
      });
      console.log('рефреш удался');
      this.setItems(response.data);
    } catch (e) {
      console.log('рефреш не удался');
      this.removeItems();
      window.location.href = '/login';
    }
  },
  setItems(data: { access_token: string; refresh_token: string }): void {
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('time', data.refresh_token);
  },
  getItems(): { token: Nulleble<string>; time: Nulleble<string> } {
    return { token: localStorage.getItem('token'), time: localStorage.getItem('time') };
  },
  removeItems(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('time');
  },
};

export default tokenService;
