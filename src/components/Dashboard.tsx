import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp, CheckCircle, Clock, MapPin, Flame, TreePine, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const stats = {
    total: 156,
    pending: 23,
    investigating: 45,
    resolved: 78,
    dismissed: 10
  };

  const recentReports = [
    {
      id: 'DEN-2024-001',
      type: 'Desmatamento',
      location: 'Mata Atlântica - SP',
      urgency: 'high',
      status: 'investigating',
      icon: TreePine
    },
    {
      id: 'DEN-2024-002',
      type: 'Queimadas',
      location: 'Cerrado - GO',
      urgency: 'critical',
      status: 'pending',
      icon: Flame
    },
    {
      id: 'DEN-2024-003',
      type: 'Descarte Irregular',
      location: 'Rio Tietê - SP',
      urgency: 'medium',
      status: 'resolved',
      icon: Trash2
    }
  ];

  const typeStats = [
    { type: 'Desmatamento', count: 45, icon: TreePine, color: 'text-success' },
    { type: 'Queimadas', count: 38, icon: Flame, color: 'text-destructive' },
    { type: 'Descarte Irregular', count: 42, icon: Trash2, color: 'text-warning' },
    { type: 'Poluição', count: 31, icon: AlertTriangle, color: 'text-accent' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Denúncias</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando análise
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Investigação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.investigating}</div>
            <p className="text-xs text-muted-foreground">
              Sendo analisadas
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolvidas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground">
              Casos finalizados
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Denúncias Recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReports.map((report) => {
              const IconComponent = report.icon;
              return (
                <div key={report.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{report.id}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {report.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge 
                      variant={report.urgency === 'critical' ? 'destructive' : 'outline'}
                      className="text-xs"
                    >
                      {report.urgency === 'critical' ? 'Crítica' : 
                       report.urgency === 'high' ? 'Alta' : 'Média'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {report.status === 'pending' ? 'Pendente' : 
                       report.status === 'investigating' ? 'Investigando' : 'Resolvida'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Tipo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {typeStats.map((stat) => {
              const IconComponent = stat.icon;
              const percentage = ((stat.count / stats.total) * 100).toFixed(1);
              
              return (
                <div key={stat.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className={`h-4 w-4 ${stat.color}`} />
                      <span className="font-medium">{stat.type}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {stat.count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-dashed hover:bg-muted/50 cursor-pointer transition-colors">
              <AlertTriangle className="h-8 w-8 text-warning mb-2" />
              <div className="font-medium">Denúncias Críticas</div>
              <div className="text-sm text-muted-foreground">
                Ver casos que requerem atenção imediata
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-dashed hover:bg-muted/50 cursor-pointer transition-colors">
              <MapPin className="h-8 w-8 text-accent mb-2" />
              <div className="font-medium">Mapa de Denúncias</div>
              <div className="text-sm text-muted-foreground">
                Visualizar denúncias por localização
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-dashed hover:bg-muted/50 cursor-pointer transition-colors">
              <TrendingUp className="h-8 w-8 text-success mb-2" />
              <div className="font-medium">Relatórios</div>
              <div className="text-sm text-muted-foreground">
                Gerar relatórios estatísticos
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;