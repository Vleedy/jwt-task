import { $api } from '../http/index';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

const AuthService = {
  async test(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get('https://jsonplaceholder.typicode.com/todos/2');
  },
  async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post('/refresh', { email, password });
  },

  async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post('/registration', { email, password });
  },

  async logout(): Promise<void> {
    return $api.post('/logout');
  },
};

export default AuthService;
