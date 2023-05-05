import axios, { AxiosResponse } from 'axios';
import tokenService from '../services/tokenService';
import { AuthResponse } from '../models/response/AuthResponse';
import { ILoginDto, IRegistrationDto } from '../models/request/AuthRequest';

const API_URL = 'http://localhost:3000';

const $auth = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const authApi = {
  login(loginDto: ILoginDto) {
    return $auth
      .post<{}, AxiosResponse<AuthResponse>, ILoginDto>('/auth/local/signin', loginDto)
      .then((response) => {
        tokenService.setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  registration(registrationDto: IRegistrationDto) {
    return $auth
      .post<{}, AxiosResponse<AuthResponse>, IRegistrationDto>(
        '/auth/local/signup',
        registrationDto
      )
      .then((response) => {
        tokenService.setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  logout() {
    return $auth
      .post<{}, AxiosResponse<AuthResponse>>('/auth/local/signin')
      .then((response) => {
        response.status === 200 {
          
        }
        tokenService.setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  
};
