import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Camera, FileText, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    reporterName: '',
    reporterContact: '',
    urgency: ''
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Denúncia enviada com sucesso!",
      description: "Sua denúncia foi registrada e será analisada pela equipe responsável.",
    });
    
    // Reset form
    setFormData({
      type: '',
      location: '',
      description: '',
      reporterName: '',
      reporterContact: '',
      urgency: ''
    });
  };

  const reportTypes = [
    { value: 'deforestation', label: 'Desmatamento' },
    { value: 'burning', label: 'Queimadas' },
    { value: 'illegal_disposal', label: 'Descarte Irregular' },
    { value: 'water_pollution', label: 'Poluição da Água' },
    { value: 'air_pollution', label: 'Poluição do Ar' },
    { value: 'noise_pollution', label: 'Poluição Sonora' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
    { value: 'critical', label: 'Crítica' }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elevated">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-warning" />
          <CardTitle className="text-2xl">Nova Denúncia Ambiental</CardTitle>
        </div>
        <CardDescription>
          Registre uma denúncia de crime ambiental. Todas as informações são confidenciais e serão analisadas pela equipe responsável.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Denúncia *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Nível de Urgência *</Label>
              <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a urgência" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Localização *
            </Label>
            <Input
              id="location"
              placeholder="Ex: Rua das Flores, 123, Bairro Centro, Cidade - UF"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Descrição Detalhada *
            </Label>
            <Textarea
              id="description"
              placeholder="Descreva em detalhes o problema ambiental observado, incluindo data e horário se possível..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="min-h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reporterName">Nome do Denunciante</Label>
              <Input
                id="reporterName"
                placeholder="Seu nome (opcional)"
                value={formData.reporterName}
                onChange={(e) => setFormData({...formData, reporterName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reporterContact">Contato</Label>
              <Input
                id="reporterContact"
                placeholder="Telefone ou email (opcional)"
                value={formData.reporterContact}
                onChange={(e) => setFormData({...formData, reporterContact: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Anexar Evidências (Fotos/Documentos)
            </Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center bg-muted/20">
              <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Clique para anexar fotos ou documentos
              </p>
              <Input type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden" />
              <Button type="button" variant="outline" size="sm">
                Escolher Arquivos
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" size="lg">
              Enviar Denúncia
            </Button>
            <Button type="button" variant="outline" size="lg">
              Limpar Formulário
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReportForm;