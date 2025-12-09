/**
 * @summary
 * In-memory store instance for Habit entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/habit/habitStore
 */

import { HABIT_DEFAULTS } from '@/constants/habit';

/**
 * Habit record structure
 */
export interface HabitRecord {
  id: string;
  nome: string;
  descricao: string | null;
  categoria: string;
  icone: string;
  data_criacao: string;
  status: string;
  usuario_id: string;
  fuso_horario: string;
}

/**
 * In-memory store for Habit records
 */
class HabitStore {
  private records: Map<string, HabitRecord> = new Map();

  /**
   * Get all records
   */
  getAll(): HabitRecord[] {
    return Array.from(this.records.values());
  }

  /**
   * Get record by ID
   */
  getById(id: string): HabitRecord | undefined {
    return this.records.get(id);
  }

  /**
   * Add new record
   */
  add(record: HabitRecord): HabitRecord {
    this.records.set(record.id, record);
    return record;
  }

  /**
   * Update existing record
   */
  update(id: string, data: Partial<HabitRecord>): HabitRecord | undefined {
    const existing = this.records.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data };
    this.records.set(id, updated);
    return updated;
  }

  /**
   * Delete record by ID
   */
  delete(id: string): boolean {
    return this.records.delete(id);
  }

  /**
   * Check if record exists
   */
  exists(id: string): boolean {
    return this.records.has(id);
  }

  /**
   * Check if habit name exists for user
   */
  existsByName(nome: string): boolean {
    return Array.from(this.records.values()).some((h) => h.nome === nome);
  }

  /**
   * Count active habits
   */
  countActive(): number {
    return Array.from(this.records.values()).filter(
      (h) => h.status === HABIT_DEFAULTS.STATUS_ACTIVE
    ).length;
  }

  /**
   * Get total count of records
   */
  count(): number {
    return this.records.size;
  }

  /**
   * Clear all records (useful for testing)
   */
  clear(): void {
    this.records.clear();
  }
}

/**
 * Singleton instance of HabitStore
 */
export const habitStore = new HabitStore();
