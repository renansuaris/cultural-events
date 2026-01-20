import api from './api';
import type { Event, CreateEventDTO, UpdateEventDTO, PaginatedResponse } from '@/types';

export default {
  async getAll(params?: URLSearchParams) {
    const queryString = params ? `?${params.toString()}` : '';
    const { data } = await api.get<PaginatedResponse<Event>>(`/events${queryString}`);
    return data;
  },

  async getById(id: string) {
    const { data } = await api.get<Event>(`/events/${id}`);
    return data;
  },

  async create(eventData: CreateEventDTO) {
    const { data } = await api.post<Event>('/events', eventData);
    return data;
  },

  async update(id: string, eventData: UpdateEventDTO) {
    const { data } = await api.put<Event>(`/events/${id}`, eventData);
    return data;
  },

  async delete(id: string) {
    await api.delete(`/events/${id}`);
  }
};