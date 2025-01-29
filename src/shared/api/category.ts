import { AxiosRequestConfig } from 'axios';
import { baseInstance } from './base';
import { Category } from './types';
import { CreateCategoryBody, EditCategoryBody } from './types/api/category';

export const category = {
  getList: (config?: AxiosRequestConfig) => {
    return baseInstance.get<{ data: Category[] }>('/api/v1/category', config);
  },
  create: (body: CreateCategoryBody, config?: AxiosRequestConfig) => {
    return baseInstance.post('/api/v1/category', body, config);
  },
  edit: (id: number, body: EditCategoryBody, config?: AxiosRequestConfig) => {
    return baseInstance.put(`/api/v1/category/${id}`, body, config);
  },
  delete: (id: number, config?: AxiosRequestConfig) => {
    return baseInstance.delete(`/api/v1/category/${id}`, config);
  },
};
