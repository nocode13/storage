import { AxiosRequestConfig } from 'axios';
import { baseInstance } from './base';
import { LoginBody, LoginRes } from './types/api/auth';

export const auth = {
  login: (body: LoginBody, config?: AxiosRequestConfig) => {
    return baseInstance.post<LoginRes>('/api/v1/auth/login', body, config);
  },
};
