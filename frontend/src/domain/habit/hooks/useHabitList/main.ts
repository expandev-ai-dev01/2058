/**
 * @hook useHabitList
 * @description Hook for managing habit list with React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { habitService } from '../../services/habitService';
import type { HabitListParams, HabitArchiveInput } from '../../types';
import type { HabitFormOutput } from '../../types/forms';
import { toast } from 'sonner';

export const useHabitList = (params?: HabitListParams) => {
  const queryClient = useQueryClient();
  const queryKey = ['habits', params];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => habitService.list(params),
  });

  const { mutateAsync: createHabit, isPending: isCreating } = useMutation({
    mutationFn: (habitData: HabitFormOutput) => habitService.create(habitData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      toast.success('Hábito criado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao criar hábito');
    },
  });

  const { mutateAsync: updateHabit, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<HabitFormOutput> }) =>
      habitService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      toast.success('Hábito atualizado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao atualizar hábito');
    },
  });

  const { mutateAsync: deleteHabit, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => habitService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      toast.success('Hábito excluído com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao excluir hábito');
    },
  });

  const { mutateAsync: archiveHabit, isPending: isArchiving } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: HabitArchiveInput }) =>
      habitService.archive(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      toast.success('Hábito arquivado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao arquivar hábito');
    },
  });

  const { mutateAsync: restoreHabit, isPending: isRestoring } = useMutation({
    mutationFn: (id: string) => habitService.restore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      toast.success('Hábito restaurado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao restaurar hábito');
    },
  });

  return {
    habits: data || [],
    isLoading,
    error,
    refetch,
    createHabit,
    isCreating,
    updateHabit,
    isUpdating,
    deleteHabit,
    isDeleting,
    archiveHabit,
    isArchiving,
    restoreHabit,
    isRestoring,
  };
};
