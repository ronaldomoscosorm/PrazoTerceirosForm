import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Collaborator } from '@/types/collaborator';
import { toast } from '@/hooks/use-toast';

interface CollaboratorFormProps {
  onAddCollaborator: (collaborator: Collaborator) => void;
}

const CollaboratorForm: React.FC<CollaboratorFormProps> = ({ onAddCollaborator }) => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [unidade, setUnidade] = useState('');
  const [grupo, setGrupo] = useState('');
  const [setor, setSetor] = useState('');
  const [gestor, setGestor] = useState('');
  const [integracao, setIntegracao] = useState<Date | null>(null);
  const [aso, setAso] = useState<Date | null>(null);
  const [nr10, setNr10] = useState<Date | null>(null);
  const [nr10Sep, setNr10Sep] = useState<Date | null>(null);
  const [nr11, setNr11] = useState<Date | null>(null);
  const [nr12, setNr12] = useState<Date | null>(null);
  const [nr18, setNr18] = useState<Date | null>(null);
  const [nr18Andaime, setNr18Andaime] = useState<Date | null>(null);
  const [nr20, setNr20] = useState<Date | null>(null);
  const [nr33, setNr33] = useState<Date | null>(null);
  const [nr35, setNr35] = useState<Date | null>(null);
  const [nr34, setNr34] = useState<Date | null>(null);
  const [pgroPcmat, setPgroPcmat] = useState<Date | null>(null);
  const [pcmso, setPcmso] = useState<Date | null>(null);
  const [ppr, setPpr] = useState<Date | null>(null);
  const [loto, setLoto] = useState<Date | null>(null);
  const [ptaPlataforma, setPtaPlataforma] = useState<Date | null>(null);

  const unidades = ['Unidade A', 'Unidade B', 'Unidade C', 'Unidade D'];
  const grupos = ['Grupo 1', 'Grupo 2', 'Grupo 3', 'Grupo 4'];
  const setores = ['Setor Administrativo', 'Setor Operacional', 'Setor Técnico', 'Setor Comercial'];

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
    if (!nomeCompleto.trim()) {
      toast({
        title: "Erro de validação",
        description: "Nome Completo deve ser preenchido.",
        variant: "destructive",
      });
      return false;
    }

    if (!cpf.trim() || cpf.replace(/\D/g, '').length !== 11) {
      toast({
        title: "Erro de validação",
        description: "CPF deve ser preenchido.",
        variant: "destructive",
      });
      return false;
    }

    if (!integracao) {
      toast({
        title: "Erro de validação",
        description: "Integração deve ser preenchido.",
        variant: "destructive",
      });
      return false;
    }

    if (!aso) {
      toast({
        title: "Erro de validação",
        description: "ASO deve ser preenchido.",
        variant: "destructive",
      });
      return false;
    }

    if (!pgroPcmat) {
      toast({
        title: "Erro de validação",
        description: "PGRO/PCMAT deve ser preenchido.",
        variant: "destructive",
      });
      return false;
    }

    if (!pcmso) {
      toast({
        title: "Erro de validação",
        description: "PCMSO deve ser preenchido.",
        variant: "destructive",
      });
      return false;
    }

    if (!unidade || !grupo || !setor) {
      toast({
        title: "Erro de validação",
        description: "Unidade, Grupo e Setor devem ser preenchidos.",
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
      nomeCompleto: nomeCompleto.trim(),
      cpf: cpf.trim(),
      unidade,
      grupo,
      setor,
      gestor: gestor.trim(),
      integracao,
      aso,
      nr10,
      nr10Sep,
      nr11,
      nr12,
      nr18,
      nr18Andaime,
      nr20,
      nr33,
      nr35,
      nr34,
      pgroPcmat,
      pcmso,
      ppr,
      loto,
      ptaPlataforma,
    };

    onAddCollaborator(newCollaborator);
    
    // Reset form
    setNomeCompleto('');
    setCpf('');
    setUnidade('');
    setGrupo('');
    setSetor('');
    setGestor('');
    setIntegracao(null);
    setAso(null);
    setNr10(null);
    setNr10Sep(null);
    setNr11(null);
    setNr12(null);
    setNr18(null);
    setNr18Andaime(null);
    setNr20(null);
    setNr33(null);
    setNr35(null);
    setNr34(null);
    setPgroPcmat(null);
    setPcmso(null);
    setPpr(null);
    setLoto(null);
    setPtaPlataforma(null);

    toast({
      title: "Colaborador adicionado",
      description: "Colaborador adicionado com sucesso!",
    });
  };

  const DatePicker = ({ 
    date, 
    onDateChange, 
    placeholder,
    required = false
  }: { 
    date: Date | null; 
    onDateChange: (date: Date | null) => void; 
    placeholder: string;
    required?: boolean;
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            required && !date && "border-red-500"
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
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Adicionar Colaborador
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                <Input
                  id="nomeCompleto"
                  type="text"
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
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
          </div>

          {/* Dados Organizacionais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados Organizacionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Unidade *</Label>
                <Select value={unidade} onValueChange={setUnidade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {unidades.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Grupo *</Label>
                <Select value={grupo} onValueChange={setGrupo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    {grupos.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Setor *</Label>
                <Select value={setor} onValueChange={setSetor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar setor" />
                  </SelectTrigger>
                  <SelectContent>
                    {setores.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gestor">Gestor</Label>
                <Input
                  id="gestor"
                  type="text"
                  value={gestor}
                  onChange={(e) => setGestor(e.target.value)}
                  placeholder="Nome do gestor"
                />
              </div>
            </div>
          </div>

          {/* Datas de Vencimento */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Datas de Vencimento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Integração *</Label>
                <DatePicker
                  date={integracao}
                  onDateChange={setIntegracao}
                  placeholder="Selecionar data"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>ASO *</Label>
                <DatePicker
                  date={aso}
                  onDateChange={setAso}
                  placeholder="Selecionar data"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>NR10</Label>
                <DatePicker
                  date={nr10}
                  onDateChange={setNr10}
                  placeholder="Selecionar data"
                />
              </div>
              <div className="space-y-2">
                <Label>NR10-SEP</Label>
                <DatePicker
                  date={nr10Sep}
                  onDateChange={setNr10Sep}
                  placeholder="Selecionar data"
                />
              </div>
              <div className="space-y-2">
                <Label>NR11</Label>
                <DatePicker
                  date={nr11}
                  onDateChange={setNr11}
                  placeholder="Selecionar data"
                />
              </div>
              <div className="space-y-2">
                <Label>NR12</Label>
                <DatePicker
                  date={nr12}
                  onDateChange={setNr12}
                  placeholder="Selecionar data"
                />
              </div>
              <div className="space-y-2">
                <Label>NR18</Label>
                <DatePicker
                  date={nr18}
                  onDateChange={setNr18}
                  placeholder="Selecionar data"
                />
              </div>
              <div className="space-y-2">
                <Label>NR18 Andaime</Label>
                <DatePicker
                  date={nr18Andaime}
                  onDateChange={setNr18Andaime}
                  placeholder="Selecionar data"
                />
              </div>
              <div className="space-y-2">
                <Label>NR20</Label>
                <DatePicker
                  date={nr20}
                  onDateChange={setNr20}
                  placeholder="Selecionar data"
                />
              </div>
              <div className="space-y-2">
                <Label>NR33</Label>
                <DatePicker
                  date={nr33}
                  onDateChange={setNr33}
                  placeholder="Selecionar data"
                />
              </div>
              <div className="space-y-2">
                <Label>NR35</Label>
                <DatePicker
                  date={nr35}
                  onDateChange={setNr35}
                  placeholder="Selecionar data"
                />
              </div>
              <div className="space-y-2">
                <Label>NR34</Label>
                <DatePicker
                  date={nr34}
                  onDateChange={setNr34}
                  placeholder="Selecionar data"
                />
              </div>
              <div className="space-y-2">
                <Label>PGRO/PCMAT *</Label>
                <DatePicker
                  date={pgroPcmat}
                  onDateChange={setPgroPcmat}
                  placeholder="Selecionar data"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>PCMSO *</Label>
                <DatePicker
                  date={pcmso}
                  onDateChange={setPcmso}
                  placeholder="Selecionar data"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>PPR</Label>
                <DatePicker
                  date={ppr}
                  onDateChange={setPpr}
                  placeholder="Selecionar data"
                />
              </div>
              <div className="space-y-2">
                <Label>Loto</Label>
                <DatePicker
                  date={loto}
                  onDateChange={setLoto}
                  placeholder="Selecionar data"
                />
              </div>
              <div className="space-y-2">
                <Label>PTA Plataforma</Label>
                <DatePicker
                  date={ptaPlataforma}
                  onDateChange={setPtaPlataforma}
                  placeholder="Selecionar data"
                />
              </div>
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
