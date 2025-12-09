/**
 * @summary
 * API controller for Habit entity.
 * Handles HTTP requests for habit management operations.
 *
 * @module api/internal/habit/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  habitCreate,
  habitList,
  habitGet,
  habitUpdate,
  habitDelete,
  habitArchive,
  habitRestore,
} from '@/services/habit';

/**
 * @api {get} /api/internal/habit List Habits
 * @apiName ListHabits
 * @apiGroup Habit
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data List of habits
 * @apiSuccess {String} data.id Unique identifier (UUID)
 * @apiSuccess {String} data.nome Name
 * @apiSuccess {String} data.categoria Category
 * @apiSuccess {String} data.icone Icon identifier
 * @apiSuccess {String} data.status Status (Ativo | Arquivado | Inativo)
 * @apiSuccess {String} data.data_criacao ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code
 * @apiError {String} error.message Error message
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await habitList();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/habit Create Habit
 * @apiName CreateHabit
 * @apiGroup Habit
 *
 * @apiBody {String} nome Name (3-50 chars)
 * @apiBody {String|null} descricao Description (max 200 chars)
 * @apiBody {String} categoria Category (Saúde | Fitness | Produtividade | Educação | Finanças | Bem-estar | Outros)
 * @apiBody {String} icone Icon identifier
 * @apiBody {String} fuso_horario Timezone (IANA format)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Unique identifier (UUID)
 * @apiSuccess {String} data.nome Name
 * @apiSuccess {String|null} data.descricao Description
 * @apiSuccess {String} data.categoria Category
 * @apiSuccess {String} data.icone Icon identifier
 * @apiSuccess {String} data.status Status (Ativo)
 * @apiSuccess {String} data.fuso_horario Timezone
 * @apiSuccess {String} data.data_criacao ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | LIMIT_REACHED | DUPLICATE_NAME)
 * @apiError {String} error.message Error message
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await habitCreate(req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/habit/:id Get Habit
 * @apiName GetHabit
 * @apiGroup Habit
 *
 * @apiParam {String} id Habit ID (UUID)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Unique identifier (UUID)
 * @apiSuccess {String} data.nome Name
 * @apiSuccess {String|null} data.descricao Description
 * @apiSuccess {String} data.categoria Category
 * @apiSuccess {String} data.icone Icon identifier
 * @apiSuccess {String} data.status Status
 * @apiSuccess {String} data.fuso_horario Timezone
 * @apiSuccess {String} data.data_criacao ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await habitGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/habit/:id Update Habit
 * @apiName UpdateHabit
 * @apiGroup Habit
 *
 * @apiParam {String} id Habit ID (UUID)
 *
 * @apiBody {String} nome Name (3-50 chars)
 * @apiBody {String|null} descricao Description (max 200 chars)
 * @apiBody {String} categoria Category
 * @apiBody {String} icone Icon identifier
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Unique identifier (UUID)
 * @apiSuccess {String} data.nome Name
 * @apiSuccess {String|null} data.descricao Description
 * @apiSuccess {String} data.categoria Category
 * @apiSuccess {String} data.icone Icon identifier
 * @apiSuccess {String} data.status Status
 * @apiSuccess {String} data.fuso_horario Timezone
 * @apiSuccess {String} data.data_criacao ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR | DUPLICATE_NAME)
 * @apiError {String} error.message Error message
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await habitUpdate(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {delete} /api/internal/habit/:id Delete Habit
 * @apiName DeleteHabit
 * @apiGroup Habit
 *
 * @apiParam {String} id Habit ID (UUID)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await habitDelete(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/habit/:id/archive Archive Habit
 * @apiName ArchiveHabit
 * @apiGroup Habit
 *
 * @apiParam {String} id Habit ID (UUID)
 *
 * @apiBody {String} motivo_arquivamento Reason for archiving (max 200 chars)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR | ALREADY_ARCHIVED)
 * @apiError {String} error.message Error message
 */
export async function archiveHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await habitArchive(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/habit/:id/restore Restore Habit
 * @apiName RestoreHabit
 * @apiGroup Habit
 *
 * @apiParam {String} id Habit ID (UUID)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR | ALREADY_ACTIVE)
 * @apiError {String} error.message Error message
 */
export async function restoreHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await habitRestore(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
