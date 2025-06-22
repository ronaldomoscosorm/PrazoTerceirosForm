
import React, { useState } from 'react';
import { format } from 'date-fns';
import CollaboratorForm from '@/components/CollaboratorForm';
import CollaboratorList from '@/components/CollaboratorList';
import { Collaborator } from '@/types/collaborator';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Shield } from 'lucide-react';

const Index = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const handleAddCollaborator = (collaborator: Collaborator) => {
    setCollaborators(prev => [...prev, collaborator]);
  };

  const handleRemoveCollaborator = (id: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Colaborador removido",
      description: "Colaborador removido com sucesso!",
    });
  };

  const handleDownloadCSV = () => {
    if (collaborators.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um colaborador antes de baixar o CSV.",
        variant: "destructive",
      });
      return;
    }

    // Cabeçalho do CSV
    const csvHeader = "Nome,CPF,Data ASO,Data NR10,Data NR12\n";
    
    // Dados dos colaboradores
    const csvData = collaborators.map(c => {
      const dataAso = c.dataAso ? format(c.dataAso, 'dd/MM/yyyy') : '';
      const dataNr10 = c.dataNr10 ? format(c.dataNr10, 'dd/MM/yyyy') : '';
      const dataNr12 = c.dataNr12 ? format(c.dataNr12, 'dd/MM/yyyy') : '';
      
      return `"${c.nome}","${c.cpf}","${dataAso}","${dataNr10}","${dataNr12}"`;
    }).join('\n');

    const csvContent = csvHeader + csvData;
    
    // Criar blob e link para download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `colaboradores_${format(new Date(), 'dd-MM-yyyy')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    toast({
      title: "CSV baixado",
      description: "O arquivo CSV foi baixado com sucesso!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Controle de Vencimentos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistema para cadastramento e controle das datas de vencimento de colaboradores terceirizados
          </p>
        </div>

        {/* Cards informativos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <FileText className="h-8 w-8 mx-auto text-blue-600" />
              <CardTitle className="text-lg">ASO</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Atestado de Saúde Ocupacional
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Shield className="h-8 w-8 mx-auto text-green-600" />
              <CardTitle className="text-lg">NR10</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Segurança em Instalações e Serviços em Eletricidade
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Shield className="h-8 w-8 mx-auto text-orange-600" />
              <CardTitle className="text-lg">NR12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Segurança no Trabalho em Máquinas e Equipamentos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Formulário */}
        <CollaboratorForm onAddCollaborator={handleAddCollaborator} />

        {/* Lista de colaboradores */}
        <CollaboratorList
          collaborators={collaborators}
          onRemoveCollaborator={handleRemoveCollaborator}
          onDownloadCSV={handleDownloadCSV}
        />
      </div>
    </div>
  );
};

export default Index;
