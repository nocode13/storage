import { AxiosRequestConfig } from 'axios';
import { baseInstance } from './base';
import { User } from './types';

export const user = {
  getProfile: (config?: AxiosRequestConfig) => {
    return baseInstance.get<User>('/api/v1/user/me', config);
  },
};
