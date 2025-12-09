/**
 * @summary
 * Type definitions for Habit entity.
 *
 * @module services/habit/habitTypes
 */

/**
 * @interface HabitEntity
 * @description Represents a habit entity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} nome - Habit name
 * @property {string | null} descricao - Habit description
 * @property {string} categoria - Habit category
 * @property {string} icone - Icon identifier
 * @property {string} data_criacao - Creation timestamp (ISO 8601)
 * @property {string} status - Habit status (Ativo | Arquivado | Inativo)
 * @property {string} usuario_id - User identifier (UUID)
 * @property {string} fuso_horario - User timezone (IANA format)
 */
export interface HabitEntity {
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
 * @interface HabitCreateRequest
 * @description Request payload for creating a habit
 *
 * @property {string} nome - Habit name (3-50 chars)
 * @property {string | null} descricao - Habit description (max 200 chars)
 * @property {string} categoria - Habit category
 * @property {string} icone - Icon identifier
 * @property {string} fuso_horario - User timezone (IANA format)
 */
export interface HabitCreateRequest {
  nome: string;
  descricao: string | null;
  categoria: string;
  icone: string;
  fuso_horario: string;
}

/**
 * @interface HabitUpdateRequest
 * @description Request payload for updating a habit
 *
 * @property {string} nome - Habit name (3-50 chars)
 * @property {string | null} descricao - Habit description (max 200 chars)
 * @property {string} categoria - Habit category
 * @property {string} icone - Icon identifier
 */
export interface HabitUpdateRequest {
  nome: string;
  descricao: string | null;
  categoria: string;
  icone: string;
}

/**
 * @interface HabitListResponse
 * @description Response structure for listing habits
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} nome - Habit name
 * @property {string} categoria - Habit category
 * @property {string} icone - Icon identifier
 * @property {string} status - Habit status
 * @property {string} data_criacao - Creation timestamp (ISO 8601)
 */
export interface HabitListResponse {
  id: string;
  nome: string;
  categoria: string;
  icone: string;
  status: string;
  data_criacao: string;
}

/**
 * @interface HabitArchiveRequest
 * @description Request payload for archiving a habit
 *
 * @property {string} motivo_arquivamento - Reason for archiving (max 200 chars)
 */
export interface HabitArchiveRequest {
  motivo_arquivamento: string;
}
