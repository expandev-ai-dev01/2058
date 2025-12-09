import type { HabitFormInput } from '../../types/forms';

export interface HabitFormProps {
  initialData?: Partial<HabitFormInput>;
  onSubmit: (data: HabitFormInput) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}
