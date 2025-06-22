
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Collaborator } from '@/types/collaborator';
import { toast } from '@/hooks/use-toast';

interface CollaboratorFormProps {
  onAddCollaborator: (collaborator: Collaborator) => void;
}

const CollaboratorForm: React.FC<CollaboratorFormProps> = ({ onAddCollaborator }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataAso, setDataAso] = useState<Date | null>(null);
  const [dataNr10, setDataNr10] = useState<Date | null>(null);
  const [dataNr12, setDataNr12] = useState<Date | null>(null);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  const validateForm = () => {
    if (!nome.trim()) {
      toast({
        title: "Erro de validação",
        description: "Nome é obrigatório",
        variant: "destructive",
      });
      return false;
    }

    if (!cpf.trim() || cpf.replace(/\D/g, '').length !== 11) {
      toast({
        title: "Erro de validação",
        description: "CPF deve conter 11 dígitos",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      nome: nome.trim(),
      cpf: cpf.trim(),
      dataAso,
      dataNr10,
      dataNr12,
    };

    onAddCollaborator(newCollaborator);
    
    // Reset form
    setNome('');
    setCpf('');
    setDataAso(null);
    setDataNr10(null);
    setDataNr12(null);

    toast({
      title: "Colaborador adicionado",
      description: "Colaborador adicionado com sucesso!",
    });
  };

  const DatePicker = ({ 
    date, 
    onDateChange, 
    placeholder 
  }: { 
    date: Date | null; 
    onDateChange: (date: Date | null) => void; 
    placeholder: string;
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={onDateChange}
          initialFocus
          className="p-3 pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Adicionar Colaborador
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome completo do colaborador"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                type="text"
                value={cpf}
                onChange={handleCPFChange}
                placeholder="000.000.000-00"
                maxLength={14}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Data da ASO</Label>
              <DatePicker
                date={dataAso}
                onDateChange={setDataAso}
                placeholder="Selecionar data"
              />
            </div>
            <div className="space-y-2">
              <Label>Data da NR10</Label>
              <DatePicker
                date={dataNr10}
                onDateChange={setDataNr10}
                placeholder="Selecionar data"
              />
            </div>
            <div className="space-y-2">
              <Label>Data da NR12</Label>
              <DatePicker
                date={dataNr12}
                onDateChange={setDataNr12}
                placeholder="Selecionar data"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Colaborador
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CollaboratorForm;
