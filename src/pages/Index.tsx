
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import CollaboratorForm from '@/components/CollaboratorForm';
import CollaboratorList from '@/components/CollaboratorList';
import { Collaborator } from '@/types/collaborator';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Shield, ExternalLink } from 'lucide-react';

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

    // Cabeçalho do CSV com o campo empresa
    const csvHeader = "Nome Completo,CPF,Empresa,Unidade,Grupo,Setor,Gestor,Integração,ASO,NR10,NR10-SEP,NR11,NR12,NR18,NR18 Andaime,NR20,NR33,NR35,NR34,PGRO/PCMAT,PCMSO,PPR,Loto,PTA Plataforma,Treinamento,OS,Documentação,APR/PAE,EPI,CIPA\n";
    
    // Dados dos colaboradores com o campo empresa
    const csvData = collaborators.map(c => {
      const formatDateForCSV = (date: Date | null) => date ? format(date, 'dd/MM/yyyy') : 'null';
      const formatBooleanForCSV = (value: boolean) => value ? 'Sim' : 'Não';
      
      return [
        `"${c.nomeCompleto}"`,
        `"${c.cpf}"`,
        `"${c.empresa}"`,
        `"${c.unidade}"`,
        `"${c.grupo}"`,
        `"${c.setor}"`,
        `"${c.gestor || 'null'}"`,
        `"${formatDateForCSV(c.integracao)}"`,
        `"${formatDateForCSV(c.aso)}"`,
        `"${formatDateForCSV(c.nr10)}"`,
        `"${formatDateForCSV(c.nr10Sep)}"`,
        `"${formatDateForCSV(c.nr11)}"`,
        `"${formatDateForCSV(c.nr12)}"`,
        `"${formatDateForCSV(c.nr18)}"`,
        `"${formatDateForCSV(c.nr18Andaime)}"`,
        `"${formatDateForCSV(c.nr20)}"`,
        `"${formatDateForCSV(c.nr33)}"`,
        `"${formatDateForCSV(c.nr35)}"`,
        `"${formatDateForCSV(c.nr34)}"`,
        `"${formatDateForCSV(c.pgroPcmat)}"`,
        `"${formatDateForCSV(c.pcmso)}"`,
        `"${formatDateForCSV(c.ppr)}"`,
        `"${formatDateForCSV(c.loto)}"`,
        `"${formatDateForCSV(c.ptaPlataforma)}"`,
        `"${formatBooleanForCSV(c.treinamento)}"`,
        `"${formatBooleanForCSV(c.os)}"`,
        `"${formatBooleanForCSV(c.documentacao)}"`,
        `"${formatBooleanForCSV(c.aprPae)}"`,
        `"${formatBooleanForCSV(c.epi)}"`,
        `"${formatBooleanForCSV(c.cipa)}"`
      ].join(',');
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
          
          {/* Link para versão HTML5 */}
          <div className="mt-4">
            <Link to="/html5">
              <Button variant="outline" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Acessar Versão HTML5
              </Button>
            </Link>
          </div>
        </div>

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
              <CardTitle className="text-lg">Normas Regulamentadoras</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                NR10, NR11, NR12, NR18, NR20, NR33, NR34, NR35
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Calendar className="h-8 w-8 mx-auto text-orange-600" />
              <CardTitle className="text-lg">Programas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                PGRO/PCMAT, PC1MSO, PPR, Loto, PTA
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
