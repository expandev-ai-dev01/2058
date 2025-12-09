/**
 * @module domain/habit/types/models
 * @description Habit domain type definitions
 */

export type HabitStatus = 'Ativo' | 'Arquivado' | 'Inativo';

export type HabitCategory =
  | 'Saúde'
  | 'Fitness'
  | 'Produtividade'
  | 'Educação'
  | 'Finanças'
  | 'Bem-estar'
  | 'Outros';

export interface Habit {
  id: string;
  nome: string;
  descricao: string | null;
  categoria: HabitCategory;
  icone: string;
  status: HabitStatus;
  fuso_horario: string;
  data_criacao: string;
}

export interface HabitListParams {
  status?: HabitStatus;
  categoria?: HabitCategory;
}

export interface HabitArchiveInput {
  motivo_arquivamento: string;
}
