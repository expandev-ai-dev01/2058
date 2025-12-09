/**
 * @module domain/habit/validations/habit
 * @description Habit validation schemas using Zod 4.x
 */

import { z } from 'zod';

const categories = [
  'Saúde',
  'Fitness',
  'Produtividade',
  'Educação',
  'Finanças',
  'Bem-estar',
  'Outros',
] as const;

export const habitSchema = z.object({
  nome: z
    .string('O nome do hábito é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres'),
  descricao: z
    .string()
    .max(200, 'A descrição deve ter no máximo 200 caracteres')
    .nullable()
    .optional(),
  categoria: z.enum(categories, 'Selecione uma categoria para o hábito'),
  icone: z.string('Selecione um ícone para o hábito').min(1, 'Selecione um ícone para o hábito'),
  fuso_horario: z.string(),
});
