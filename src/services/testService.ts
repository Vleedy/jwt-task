import $api from '../http/index';
import axios from 'axios';

export const testService = {
  testLogin(email: string, password: string) {
    return axios.post('http://localhost:5000/login', { email, password });
  },
  test() {
    return $api.get('/test');
  },
};
