import { AxiosRequestConfig } from 'axios';
import { baseInstance } from './base';
import { CreateProductBody, EditProductBody } from './types/api/product';
import { Product } from './types/product';

export const product = {
  getList: (config?: AxiosRequestConfig) => {
    return baseInstance.get<{ data: Product[]; total: number }>('/api/v1/product', config);
  },
  create: (body: CreateProductBody, config?: AxiosRequestConfig) => {
    return baseInstance.post('/api/v1/product', body, config);
  },
  edit: (id: number, body: EditProductBody, config?: AxiosRequestConfig) => {
    return baseInstance.put(`/api/v1/product/${id}`, body, config);
  },
  delete: (id: number, config?: AxiosRequestConfig) => {
    return baseInstance.delete(`/api/v1/product/${id}`, config);
  },
};
