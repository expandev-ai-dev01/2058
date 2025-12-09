/**
 * @summary
 * Business logic for Habit entity.
 * Handles CRUD operations using in-memory storage.
 * All validation and business logic is centralized here.
 *
 * @module services/habit/habitService
 */

import { v4 as uuidv4 } from 'uuid';
import { HABIT_DEFAULTS } from '@/constants';
import { habitStore } from '@/instances';
import { ServiceError } from '@/utils';
import { HabitEntity, HabitListResponse } from './habitTypes';
import { createSchema, updateSchema, archiveSchema, paramsSchema } from './habitValidation';

/**
 * @summary
 * Lists all habits from the in-memory store.
 *
 * @function habitList
 * @module services/habit
 *
 * @returns {Promise<HabitListResponse[]>} List of habit entities
 *
 * @example
 * const habits = await habitList();
 * // Returns: [{ id: 'uuid', nome: 'Exercício', categoria: 'Fitness', ... }]
 */
export async function habitList(): Promise<HabitListResponse[]> {
  const records = habitStore.getAll();
  return records.map((h) => ({
    id: h.id,
    nome: h.nome,
    categoria: h.categoria,
    icone: h.icone,
    status: h.status,
    data_criacao: h.data_criacao,
  }));
}

/**
 * @summary
 * Creates a new habit entity with validated data.
 *
 * @function habitCreate
 * @module services/habit
 *
 * @param {unknown} body - Raw request body to validate against createSchema
 * @returns {Promise<HabitEntity>} The newly created habit entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails schema validation
 * @throws {ServiceError} LIMIT_REACHED (400) - When user has reached maximum active habits
 * @throws {ServiceError} DUPLICATE_NAME (400) - When habit name already exists for user
 *
 * @example
 * const newHabit = await habitCreate({ nome: 'Meditar', categoria: 'Bem-estar', ... });
 * // Returns: { id: 'uuid', nome: 'Meditar', status: 'Ativo', ... }
 */
export async function habitCreate(body: unknown): Promise<HabitEntity> {
  const validation = createSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;

  /**
   * @rule {BR-001} Check active habits limit (20 max)
   */
  const activeCount = habitStore.countActive();
  if (activeCount >= HABIT_DEFAULTS.MAX_ACTIVE_HABITS) {
    throw new ServiceError('LIMIT_REACHED', 'Você atingiu o limite de 20 hábitos ativos', 400);
  }

  /**
   * @rule {BR-002} Check for duplicate names
   */
  if (habitStore.existsByName(params.nome)) {
    throw new ServiceError('DUPLICATE_NAME', 'Você já possui um hábito com este nome', 400);
  }

  const now = new Date().toISOString();
  const id = uuidv4();

  /**
   * @rule {BR-003} New habits are automatically active
   */
  const newHabit: HabitEntity = {
    id,
    nome: params.nome,
    descricao: params.descricao,
    categoria: params.categoria,
    icone: params.icone,
    data_criacao: now,
    status: HABIT_DEFAULTS.STATUS_ACTIVE,
    usuario_id: HABIT_DEFAULTS.DEFAULT_USER_ID,
    fuso_horario: params.fuso_horario,
  };

  habitStore.add(newHabit);
  return newHabit;
}

/**
 * @summary
 * Retrieves a specific habit by its unique identifier.
 *
 * @function habitGet
 * @module services/habit
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<HabitEntity>} The found habit entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When entity with given ID does not exist
 *
 * @example
 * const habit = await habitGet({ id: 'uuid' });
 * // Returns: { id: 'uuid', nome: 'Exercício', ... }
 */
export async function habitGet(params: unknown): Promise<HabitEntity> {
  const validation = paramsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const record = habitStore.getById(id);

  if (!record) {
    throw new ServiceError('NOT_FOUND', 'Hábito não encontrado', 404);
  }

  return record;
}

/**
 * @summary
 * Updates an existing habit entity with new data.
 *
 * @function habitUpdate
 * @module services/habit
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @param {unknown} body - Raw request body with update data to validate
 * @returns {Promise<HabitEntity>} The updated habit entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID or body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When entity with given ID does not exist
 * @throws {ServiceError} DUPLICATE_NAME (400) - When new name conflicts with existing habit
 *
 * @example
 * const updated = await habitUpdate({ id: 'uuid' }, { nome: 'Novo Nome', ... });
 * // Returns: { id: 'uuid', nome: 'Novo Nome', ... }
 */
export async function habitUpdate(params: unknown, body: unknown): Promise<HabitEntity> {
  const paramsValidation = paramsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramsValidation.error.errors);
  }

  const bodyValidation = updateSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { id } = paramsValidation.data;
  const existing = habitStore.getById(id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Hábito não encontrado', 404);
  }

  const updateData = bodyValidation.data;

  /**
   * @rule {BR-002} Check for duplicate names (excluding current habit)
   */
  if (updateData.nome !== existing.nome && habitStore.existsByName(updateData.nome)) {
    throw new ServiceError('DUPLICATE_NAME', 'Você já possui um hábito com este nome', 400);
  }

  const updated = habitStore.update(id, {
    nome: updateData.nome,
    descricao: updateData.descricao,
    categoria: updateData.categoria,
    icone: updateData.icone,
  });

  return updated as HabitEntity;
}

/**
 * @summary
 * Permanently deletes a habit entity by its ID.
 *
 * @function habitDelete
 * @module services/habit
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<{ message: string }>} Success confirmation message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When entity with given ID does not exist
 *
 * @example
 * const result = await habitDelete({ id: 'uuid' });
 * // Returns: { message: 'Hábito excluído com sucesso' }
 */
export async function habitDelete(params: unknown): Promise<{ message: string }> {
  const validation = paramsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;

  if (!habitStore.exists(id)) {
    throw new ServiceError('NOT_FOUND', 'Hábito não encontrado', 404);
  }

  habitStore.delete(id);
  return { message: 'Hábito excluído com sucesso' };
}

/**
 * @summary
 * Archives a habit with a reason.
 *
 * @function habitArchive
 * @module services/habit
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @param {unknown} body - Raw request body with archive reason
 * @returns {Promise<{ message: string }>} Success confirmation message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID or body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When entity with given ID does not exist
 * @throws {ServiceError} ALREADY_ARCHIVED (400) - When habit is already archived
 *
 * @example
 * const result = await habitArchive({ id: 'uuid' }, { motivo_arquivamento: 'Não uso mais' });
 * // Returns: { message: 'Hábito arquivado com sucesso' }
 */
export async function habitArchive(params: unknown, body: unknown): Promise<{ message: string }> {
  const paramsValidation = paramsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramsValidation.error.errors);
  }

  const bodyValidation = archiveSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { id } = paramsValidation.data;
  const existing = habitStore.getById(id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Hábito não encontrado', 404);
  }

  /**
   * @rule {BR-036} Check if already archived
   */
  if (existing.status === HABIT_DEFAULTS.STATUS_ARCHIVED) {
    throw new ServiceError('ALREADY_ARCHIVED', 'Este hábito já está arquivado', 400);
  }

  habitStore.update(id, {
    status: HABIT_DEFAULTS.STATUS_ARCHIVED,
  });

  return { message: 'Hábito arquivado com sucesso' };
}

/**
 * @summary
 * Restores an archived habit to active status.
 *
 * @function habitRestore
 * @module services/habit
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<{ message: string }>} Success confirmation message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When entity with given ID does not exist
 * @throws {ServiceError} ALREADY_ACTIVE (400) - When habit is already active
 *
 * @example
 * const result = await habitRestore({ id: 'uuid' });
 * // Returns: { message: 'Hábito restaurado com sucesso' }
 */
export async function habitRestore(params: unknown): Promise<{ message: string }> {
  const validation = paramsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const existing = habitStore.getById(id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Hábito não encontrado', 404);
  }

  /**
   * @rule {BR-037} Check if already active
   */
  if (existing.status === HABIT_DEFAULTS.STATUS_ACTIVE) {
    throw new ServiceError('ALREADY_ACTIVE', 'Este hábito já está ativo', 400);
  }

  habitStore.update(id, {
    status: HABIT_DEFAULTS.STATUS_ACTIVE,
  });

  return { message: 'Hábito restaurado com sucesso' };
}
