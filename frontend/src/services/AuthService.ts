import api from './api';
import type { LoginDTO, RegisterDTO, UpdateProfileDTO, User } from '@/types';

interface LoginResponse {
  user: User;
  token: string;
}

export default {
  async login(credentials: LoginDTO) {
    const { data } = await api.post<LoginResponse>('/login', credentials);
    return data;
  },

  async register(userData: RegisterDTO) {
    const { data } = await api.post<User>('/users', userData);
    return data;
  },

  async getProfile() {
    const { data } = await api.get<User>('/users/me');
    return data;
  },

  async fetchAllUsers() {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  async updateRole(id: string, role: string) {
    await api.patch(`/users/${id}/role`, { role });
  },

  async deleteUser(id: string) {
    await api.delete(`/users/${id}`);
  },

  async updateProfile(id: string, data: UpdateProfileDTO) {
    await api.put(`/users/${id}`, data);
  }
};