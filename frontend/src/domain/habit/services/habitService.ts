/**
 * @service habitService
 * @domain habit
 * @type REST
 * @description Service for habit CRUD operations
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Habit, HabitListParams, HabitArchiveInput } from '../types';
import type { HabitFormOutput } from '../types/forms';

export const habitService = {
  async list(params?: HabitListParams): Promise<Habit[]> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: Habit[] }>('/habit', {
      params,
    });
    return data.data;
  },

  async getById(id: string): Promise<Habit> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: Habit }>(
      `/habit/${id}`
    );
    return data.data;
  },

  async create(habitData: HabitFormOutput): Promise<Habit> {
    const { data } = await authenticatedClient.post<{ success: boolean; data: Habit }>(
      '/habit',
      habitData
    );
    return data.data;
  },

  async update(id: string, habitData: Partial<HabitFormOutput>): Promise<Habit> {
    const { data } = await authenticatedClient.put<{ success: boolean; data: Habit }>(
      `/habit/${id}`,
      habitData
    );
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/habit/${id}`);
  },

  async archive(id: string, archiveData: HabitArchiveInput): Promise<void> {
    await authenticatedClient.post(`/habit/${id}/archive`, archiveData);
  },

  async restore(id: string): Promise<void> {
    await authenticatedClient.post(`/habit/${id}/restore`);
  },
};
