import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, User, Eye, Filter } from 'lucide-react';

interface Report {
  id: string;
  type: string;
  location: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  reporterName: string;
  date: string;
  lastUpdate: string;
}

const mockReports: Report[] = [
  {
    id: 'DEN-2024-001',
    type: 'Desmatamento',
    location: 'Mata Atlântica, Região Sul - SP',
    description: 'Desmatamento irregular de área de preservação permanente próxima ao rio.',
    status: 'investigating',
    urgency: 'high',
    reporterName: 'Ana Silva',
    date: '2024-01-15',
    lastUpdate: '2024-01-18'
  },
  {
    id: 'DEN-2024-002',
    type: 'Queimadas',
    location: 'Cerrado, Fazenda Santa Rita - GO',
    description: 'Queimada descontrolada atingindo área de reserva legal.',
    status: 'pending',
    urgency: 'critical',
    reporterName: 'Anônimo',
    date: '2024-01-14',
    lastUpdate: '2024-01-14'
  },
  {
    id: 'DEN-2024-003',
    type: 'Descarte Irregular',
    location: 'Rio Tietê, Ponte Nova - SP',
    description: 'Descarte de resíduos industriais no rio.',
    status: 'resolved',
    urgency: 'medium',
    reporterName: 'João Santos',
    date: '2024-01-10',
    lastUpdate: '2024-01-16'
  },
  {
    id: 'DEN-2024-004',
    type: 'Poluição da Água',
    location: 'Lagoa dos Patos - RS',
    description: 'Mortandade de peixes e água com coloração anormal.',
    status: 'investigating',
    urgency: 'high',
    reporterName: 'Maria Oliveira',
    date: '2024-01-12',
    lastUpdate: '2024-01-17'
  }
];

const ReportList = () => {
  const [reports] = useState<Report[]>(mockReports);
  const [filter, setFilter] = useState({
    type: '',
    status: '',
    urgency: '',
    search: ''
  });

  const statusLabels = {
    pending: 'Pendente',
    investigating: 'Em Investigação',
    resolved: 'Resolvida',
    dismissed: 'Arquivada'
  };

  const statusColors = {
    pending: 'bg-warning',
    investigating: 'bg-accent',
    resolved: 'bg-success',
    dismissed: 'bg-muted'
  };

  const urgencyColors = {
    low: 'bg-muted',
    medium: 'bg-accent',
    high: 'bg-warning',
    critical: 'bg-destructive'
  };

  const urgencyLabels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
    critical: 'Crítica'
  };

  const filteredReports = reports.filter(report => {
    return (
      (filter.type === '' || filter.type === 'all' || report.type.includes(filter.type)) &&
      (filter.status === '' || filter.status === 'all' || report.status === filter.status) &&
      (filter.urgency === '' || filter.urgency === 'all' || report.urgency === filter.urgency) &&
      (filter.search === '' || 
        report.location.toLowerCase().includes(filter.search.toLowerCase()) ||
        report.description.toLowerCase().includes(filter.search.toLowerCase()) ||
        report.id.toLowerCase().includes(filter.search.toLowerCase())
      )
    );
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Input
                placeholder="Buscar por ID, local ou descrição..."
                value={filter.search}
                onChange={(e) => setFilter({...filter, search: e.target.value})}
              />
            </div>
            
            <Select value={filter.type} onValueChange={(value) => setFilter({...filter, type: value === "all" ? "" : value})}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de denúncia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="Desmatamento">Desmatamento</SelectItem>
                <SelectItem value="Queimadas">Queimadas</SelectItem>
                <SelectItem value="Descarte Irregular">Descarte Irregular</SelectItem>
                <SelectItem value="Poluição">Poluição</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filter.status} onValueChange={(value) => setFilter({...filter, status: value === "all" ? "" : value})}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="investigating">Em Investigação</SelectItem>
                <SelectItem value="resolved">Resolvida</SelectItem>
                <SelectItem value="dismissed">Arquivada</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filter.urgency} onValueChange={(value) => setFilter({...filter, urgency: value === "all" ? "" : value})}>
              <SelectTrigger>
                <SelectValue placeholder="Urgência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as urgências</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="critical">Crítica</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {filteredReports.length} denúncia(s) encontrada(s)
        </h3>
        
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-natural transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{report.id}</CardTitle>
                    <Badge variant="outline">{report.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {report.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {report.reporterName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(report.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={urgencyColors[report.urgency]}>
                    {urgencyLabels[report.urgency]}
                  </Badge>
                  <Badge className={statusColors[report.status]}>
                    {statusLabels[report.status]}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {report.description}
              </CardDescription>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Última atualização: {new Date(report.lastUpdate).toLocaleDateString('pt-BR')}
                </p>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportList;