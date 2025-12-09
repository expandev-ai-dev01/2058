/**
 * @summary
 * Default values and constants for Habit entity.
 * Provides centralized configuration for entity creation, validation limits,
 * and category definitions.
 *
 * @module constants/habit/habitDefaults
 */

/**
 * @interface HabitDefaultsType
 * @description Default configuration values applied when creating new Habit entities.
 *
 * @property {string} STATUS_ACTIVE - Active status value ('Ativo')
 * @property {string} STATUS_ARCHIVED - Archived status value ('Arquivado')
 * @property {string} STATUS_INACTIVE - Inactive status value ('Inativo')
 * @property {number} MAX_ACTIVE_HABITS - Maximum number of active habits allowed (20)
 * @property {string} DEFAULT_USER_ID - Default user ID for testing ('00000000-0000-0000-0000-000000000000')
 */
export const HABIT_DEFAULTS = {
  /** Active status for habits */
  STATUS_ACTIVE: 'Ativo' as const,
  /** Archived status for habits */
  STATUS_ARCHIVED: 'Arquivado' as const,
  /** Inactive status for habits */
  STATUS_INACTIVE: 'Inativo' as const,
  /** Maximum allowed active habits per user */
  MAX_ACTIVE_HABITS: 20,
  /** Default user ID for testing */
  DEFAULT_USER_ID: '00000000-0000-0000-0000-000000000000',
} as const;

/** Type representing the HABIT_DEFAULTS constant */
export type HabitDefaultsType = typeof HABIT_DEFAULTS;

/**
 * @interface HabitCategoriesType
 * @description Available categories for Habit entities.
 *
 * @property {string} SAUDE - Health category ('Saúde')
 * @property {string} FITNESS - Fitness category ('Fitness')
 * @property {string} PRODUTIVIDADE - Productivity category ('Produtividade')
 * @property {string} EDUCACAO - Education category ('Educação')
 * @property {string} FINANCAS - Finance category ('Finanças')
 * @property {string} BEM_ESTAR - Well-being category ('Bem-estar')
 * @property {string} OUTROS - Other category ('Outros')
 */
export const HABIT_CATEGORIES = {
  SAUDE: 'Saúde',
  FITNESS: 'Fitness',
  PRODUTIVIDADE: 'Produtividade',
  EDUCACAO: 'Educação',
  FINANCAS: 'Finanças',
  BEM_ESTAR: 'Bem-estar',
  OUTROS: 'Outros',
} as const;

/** Type representing the HABIT_CATEGORIES constant */
export type HabitCategoriesType = typeof HABIT_CATEGORIES;

/** Union type of all valid category values */
export type HabitCategory = (typeof HABIT_CATEGORIES)[keyof typeof HABIT_CATEGORIES];

/**
 * @interface HabitLimitsType
 * @description Validation constraints for Habit entity fields.
 *
 * @property {number} NAME_MIN_LENGTH - Minimum characters for name field (3)
 * @property {number} NAME_MAX_LENGTH - Maximum characters for name field (50)
 * @property {number} DESCRIPTION_MAX_LENGTH - Maximum characters for description field (200)
 * @property {number} ARCHIVE_REASON_MAX_LENGTH - Maximum characters for archive reason (200)
 */
export const HABIT_LIMITS = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 200,
  ARCHIVE_REASON_MAX_LENGTH: 200,
} as const;

/** Type representing the HABIT_LIMITS constant */
export type HabitLimitsType = typeof HABIT_LIMITS;
