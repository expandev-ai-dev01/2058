/**
 * @module domain/habit/types/forms
 * @description Habit form type definitions
 */

import { z } from 'zod';
import { habitSchema } from '../validations/habit';

export type HabitFormInput = z.input<typeof habitSchema>;
export type HabitFormOutput = z.output<typeof habitSchema>;
