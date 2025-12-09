/**
 * @summary
 * Centralized service exports.
 * Provides single import point for all business logic services.
 *
 * @module services
 */

export {
  initExampleCreate,
  initExampleList,
  initExampleGet,
  initExampleUpdate,
  initExampleDelete,
} from './initExample';

export {
  habitCreate,
  habitList,
  habitGet,
  habitUpdate,
  habitDelete,
  habitArchive,
  habitRestore,
} from './habit';

export type {
  InitExampleEntity,
  InitExampleCreateRequest,
  InitExampleUpdateRequest,
  InitExampleListResponse,
  InitExampleMetadata,
} from './initExample';

export type {
  HabitEntity,
  HabitCreateRequest,
  HabitUpdateRequest,
  HabitListResponse,
  HabitArchiveRequest,
} from './habit';

export type {
  CreateInput as InitExampleCreateInput,
  UpdateInput as InitExampleUpdateInput,
  ParamsInput as InitExampleParamsInput,
} from './initExample';

export type {
  CreateInput as HabitCreateInput,
  UpdateInput as HabitUpdateInput,
  ParamsInput as HabitParamsInput,
} from './habit';
