import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { habitSchema } from '../../validations/habit';
import type { HabitFormInput, HabitFormOutput } from '../../types/forms';
import type { HabitFormProps } from './types';
import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import { Textarea } from '@/core/components/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/form';
import {
  Activity,
  Book,
  Briefcase,
  DollarSign,
  Heart,
  Sparkles,
  MoreHorizontal,
} from 'lucide-react';

const categoryIcons = {
  Saúde: Heart,
  Fitness: Activity,
  Produtividade: Briefcase,
  Educação: Book,
  Finanças: DollarSign,
  'Bem-estar': Sparkles,
  Outros: MoreHorizontal,
};

const iconOptions = [
  { value: 'heart', label: 'Coração', Icon: Heart },
  { value: 'activity', label: 'Atividade', Icon: Activity },
  { value: 'briefcase', label: 'Trabalho', Icon: Briefcase },
  { value: 'book', label: 'Livro', Icon: Book },
  { value: 'dollar-sign', label: 'Dinheiro', Icon: DollarSign },
  { value: 'sparkles', label: 'Estrelas', Icon: Sparkles },
];

function HabitForm({ initialData, onSubmit, onCancel, isLoading = false }: HabitFormProps) {
  const form = useForm<HabitFormInput, unknown, HabitFormOutput>({
    resolver: zodResolver(habitSchema),
    mode: 'onBlur',
    defaultValues: {
      nome: initialData?.nome || '',
      descricao: initialData?.descricao || null,
      categoria: initialData?.categoria || undefined,
      icone: initialData?.icone || '',
      fuso_horario: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const handleSubmit = (data: HabitFormOutput) => {
    const sanitizedData = {
      ...data,
      descricao: data.descricao ? DOMPurify.sanitize(data.descricao) : null,
    };
    onSubmit(sanitizedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Hábito</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Beber água" {...field} />
              </FormControl>
              <FormDescription>Digite um nome claro e objetivo para o hábito</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adicione detalhes sobre o hábito..."
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>Descreva o hábito com mais detalhes se desejar</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(categoryIcons).map(([category, Icon]) => (
                    <SelectItem key={category} value={category}>
                      <div className="flex items-center gap-2">
                        <Icon className="size-4" />
                        <span>{category}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Escolha a categoria que melhor representa o hábito</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ícone</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um ícone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {iconOptions.map(({ value, label, Icon }) => (
                    <SelectItem key={value} value={value}>
                      <div className="flex items-center gap-2">
                        <Icon className="size-4" />
                        <span>{label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Escolha um ícone para representar visualmente o hábito
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : initialData ? 'Atualizar' : 'Criar Hábito'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { HabitForm };
