/**
 * @summary
 * Validation schemas for Habit entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/habit/habitValidation
 */

import { z } from 'zod';
import { HABIT_LIMITS, HABIT_CATEGORIES } from '@/constants';

/**
 * Schema for create request validation
 */
export const createSchema = z.object({
  nome: z.string().min(HABIT_LIMITS.NAME_MIN_LENGTH).max(HABIT_LIMITS.NAME_MAX_LENGTH),
  descricao: z.string().max(HABIT_LIMITS.DESCRIPTION_MAX_LENGTH).nullable(),
  categoria: z.enum([
    HABIT_CATEGORIES.SAUDE,
    HABIT_CATEGORIES.FITNESS,
    HABIT_CATEGORIES.PRODUTIVIDADE,
    HABIT_CATEGORIES.EDUCACAO,
    HABIT_CATEGORIES.FINANCAS,
    HABIT_CATEGORIES.BEM_ESTAR,
    HABIT_CATEGORIES.OUTROS,
  ]),
  icone: z.string().min(1),
  fuso_horario: z.string().min(1),
});

/**
 * Schema for update request validation
 */
export const updateSchema = z.object({
  nome: z.string().min(HABIT_LIMITS.NAME_MIN_LENGTH).max(HABIT_LIMITS.NAME_MAX_LENGTH),
  descricao: z.string().max(HABIT_LIMITS.DESCRIPTION_MAX_LENGTH).nullable(),
  categoria: z.enum([
    HABIT_CATEGORIES.SAUDE,
    HABIT_CATEGORIES.FITNESS,
    HABIT_CATEGORIES.PRODUTIVIDADE,
    HABIT_CATEGORIES.EDUCACAO,
    HABIT_CATEGORIES.FINANCAS,
    HABIT_CATEGORIES.BEM_ESTAR,
    HABIT_CATEGORIES.OUTROS,
  ]),
  icone: z.string().min(1),
});

/**
 * Schema for archive request validation
 */
export const archiveSchema = z.object({
  motivo_arquivamento: z.string().min(1).max(HABIT_LIMITS.ARCHIVE_REASON_MAX_LENGTH),
});

/**
 * Schema for UUID parameter validation
 */
export const paramsSchema = z.object({
  id: z.string().uuid(),
});

/**
 * Inferred types from schemas
 */
export type CreateInput = z.infer<typeof createSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;
export type ArchiveInput = z.infer<typeof archiveSchema>;
export type ParamsInput = z.infer<typeof paramsSchema>;
