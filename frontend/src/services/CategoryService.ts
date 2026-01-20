import api from './api';
import type { Category } from '@/types';

export default {
  async getAll() {
    const { data } = await api.get<Category[]>('/categories');
    return data;
  },

  async create(name: string) {
    const { data } = await api.post<Category>('/categories', { name });
    return data;
  },

  async delete(id: string) {
    await api.delete(`/categories/${id}`);
  }
};