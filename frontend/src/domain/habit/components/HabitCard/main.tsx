import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { Button } from '@/core/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/dropdown-menu';
import { MoreVertical, Edit, Trash2, Archive, ArchiveRestore } from 'lucide-react';
import type { HabitCardProps } from './types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function HabitCard({ habit, onEdit, onDelete, onArchive, onRestore, className }: HabitCardProps) {
  const isArchived = habit.status === 'Arquivado';

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-muted flex items-center justify-center rounded-lg border">
              <span className="text-lg">{habit.icone}</span>
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-base">{habit.nome}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {habit.categoria}
                </Badge>
                <Badge variant={isArchived ? 'secondary' : 'default'} className="text-xs">
                  {habit.status}
                </Badge>
              </div>
            </div>
          </div>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!isArchived && onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(habit)}>
                    <Edit className="size-4" />
                    Editar
                  </DropdownMenuItem>
                )}
                {!isArchived && onArchive && (
                  <DropdownMenuItem onClick={() => onArchive(habit.id)}>
                    <Archive className="size-4" />
                    Arquivar
                  </DropdownMenuItem>
                )}
                {isArchived && onRestore && (
                  <DropdownMenuItem onClick={() => onRestore(habit.id)}>
                    <ArchiveRestore className="size-4" />
                    Restaurar
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem variant="destructive" onClick={() => onDelete(habit.id)}>
                    <Trash2 className="size-4" />
                    Excluir
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </div>
      </CardHeader>
      {habit.descricao && (
        <CardContent>
          <p className="text-muted-foreground text-sm">{habit.descricao}</p>
        </CardContent>
      )}
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-xs">
          Criado em{' '}
          {format(new Date(habit.data_criacao), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </p>
      </CardContent>
    </Card>
  );
}

export { HabitCard };
