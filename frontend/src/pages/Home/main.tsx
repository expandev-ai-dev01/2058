import { Button } from '@/core/components/button';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Plus, TrendingUp, Calendar, Award } from 'lucide-react';

function HomePage() {
  const { navigate } = useNavigation();

  return (
    <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center space-y-8 py-12 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Transforme sua rotina com
          <span className="text-primary block">Hábitos Saudáveis</span>
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
          Acompanhe seus hábitos diários, visualize seu progresso e alcance suas metas com nosso
          sistema intuitivo de gerenciamento de hábitos.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" onClick={() => navigate('/habits')} className="gap-2">
          <Plus className="size-5" />
          Começar Agora
        </Button>
        <Button size="lg" variant="outline" onClick={() => navigate('/habits')}>
          Ver Meus Hábitos
        </Button>
      </div>

      <div className="mt-16 grid w-full max-w-5xl gap-8 md:grid-cols-3">
        <div className="bg-card flex flex-col items-center space-y-3 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
          <div className="size-12 bg-primary/10 flex items-center justify-center rounded-lg">
            <TrendingUp className="text-primary size-6" />
          </div>
          <h3 className="text-lg font-semibold">Acompanhe o Progresso</h3>
          <p className="text-muted-foreground text-center text-sm">
            Visualize estatísticas detalhadas e gráficos de evolução dos seus hábitos ao longo do
            tempo.
          </p>
        </div>

        <div className="bg-card flex flex-col items-center space-y-3 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
          <div className="size-12 bg-primary/10 flex items-center justify-center rounded-lg">
            <Calendar className="text-primary size-6" />
          </div>
          <h3 className="text-lg font-semibold">Calendário Visual</h3>
          <p className="text-muted-foreground text-center text-sm">
            Veja seu histórico completo em um calendário interativo com indicadores visuais de
            conclusão.
          </p>
        </div>

        <div className="bg-card flex flex-col items-center space-y-3 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
          <div className="size-12 bg-primary/10 flex items-center justify-center rounded-lg">
            <Award className="text-primary size-6" />
          </div>
          <h3 className="text-lg font-semibold">Conquistas</h3>
          <p className="text-muted-foreground text-center text-sm">
            Desbloqueie conquistas especiais ao manter sequências e atingir marcos importantes.
          </p>
        </div>
      </div>
    </div>
  );
}

export { HomePage };
