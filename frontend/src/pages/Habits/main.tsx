import { useState } from 'react';
import { useHabitList } from '@/domain/habit/hooks/useHabitList';
import { HabitCard } from '@/domain/habit/components/HabitCard';
import { HabitForm } from '@/domain/habit/components/HabitForm';
import type { Habit } from '@/domain/habit/types';
import type { HabitFormInput } from '@/domain/habit/types/forms';
import { Button } from '@/core/components/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/core/components/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/core/components/alert-dialog';
import { Input } from '@/core/components/input';
import { Textarea } from '@/core/components/textarea';
import { Plus, Search } from 'lucide-react';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/core/components/empty';

function HabitsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [archiveReason, setArchiveReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    habits,
    isLoading,
    createHabit,
    isCreating,
    updateHabit,
    isUpdating,
    deleteHabit,
    isDeleting,
    archiveHabit,
    isArchiving,
    restoreHabit,
  } = useHabitList();

  const filteredHabits = habits?.filter((habit) =>
    habit.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async (data: HabitFormInput) => {
    await createHabit(data);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (habit: Habit) => {
    setSelectedHabit(habit);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (data: HabitFormInput) => {
    if (!selectedHabit) return;
    await updateHabit({ id: selectedHabit.id, data });
    setIsEditDialogOpen(false);
    setSelectedHabit(null);
  };

  const handleArchiveClick = (id: string) => {
    const habit = habits?.find((h) => h.id === id);
    if (habit) {
      setSelectedHabit(habit);
      setIsArchiveDialogOpen(true);
    }
  };

  const handleArchiveConfirm = async () => {
    if (!selectedHabit || !archiveReason.trim()) return;
    await archiveHabit({ id: selectedHabit.id, data: { motivo_arquivamento: archiveReason } });
    setIsArchiveDialogOpen(false);
    setSelectedHabit(null);
    setArchiveReason('');
  };

  const handleRestore = async (id: string) => {
    await restoreHabit(id);
  };

  const handleDeleteClick = (id: string) => {
    const habit = habits?.find((h) => h.id === id);
    if (habit) {
      setSelectedHabit(habit);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedHabit) return;
    await deleteHabit(selectedHabit.id);
    setIsDeleteDialogOpen(false);
    setSelectedHabit(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Hábitos</h1>
          <p className="text-muted-foreground mt-1">Gerencie seus hábitos diários</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="size-4" />
          Novo Hábito
        </Button>
      </div>

      <div className="relative">
        <Search className="text-muted-foreground size-4 absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          placeholder="Buscar hábitos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-muted h-48 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : filteredHabits && filteredHabits.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onArchive={handleArchiveClick}
              onRestore={handleRestore}
            />
          ))}
        </div>
      ) : (
        <Empty className="min-h-[400px]">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Plus className="size-6" />
            </EmptyMedia>
            <EmptyTitle>Nenhum hábito encontrado</EmptyTitle>
            <EmptyDescription>
              {searchQuery
                ? 'Tente buscar com outros termos'
                : 'Comece criando seu primeiro hábito para acompanhar sua rotina'}
            </EmptyDescription>
          </EmptyHeader>
          {!searchQuery && (
            <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
              <Plus className="size-4" />
              Criar Primeiro Hábito
            </Button>
          )}
        </Empty>
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Criar Novo Hábito</DialogTitle>
          </DialogHeader>
          <HabitForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateDialogOpen(false)}
            isLoading={isCreating}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Hábito</DialogTitle>
          </DialogHeader>
          {selectedHabit && (
            <HabitForm
              initialData={selectedHabit}
              onSubmit={handleUpdate}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedHabit(null);
              }}
              isLoading={isUpdating}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isArchiveDialogOpen} onOpenChange={setIsArchiveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Arquivar Hábito</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Informe o motivo do arquivamento de <strong>{selectedHabit?.nome}</strong>
            </p>
            <Textarea
              placeholder="Motivo do arquivamento..."
              value={archiveReason}
              onChange={(e) => setArchiveReason(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsArchiveDialogOpen(false);
                  setSelectedHabit(null);
                  setArchiveReason('');
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleArchiveConfirm}
                disabled={!archiveReason.trim() || isArchiving}
              >
                {isArchiving ? 'Arquivando...' : 'Arquivar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Hábito</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o hábito <strong>{selectedHabit?.nome}</strong>? Esta
              ação é permanente e não pode ser desfeita. Todos os registros associados serão
              removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedHabit(null);
              }}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { HabitsPage };
