import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Users, Download, Check, X } from 'lucide-react';
import { format } from 'date-fns';
import { Collaborator } from '@/types/collaborator';

interface CollaboratorListProps {
  collaborators: Collaborator[];
  onRemoveCollaborator: (id: string) => void;
  onDownloadCSV: () => void;
}

const CollaboratorList: React.FC<CollaboratorListProps> = ({ 
  collaborators, 
  onRemoveCollaborator, 
  onDownloadCSV 
}) => {
  const formatDate = (date: Date | null) => {
    if (!date) return 'Não informado';
    return format(date, 'dd/MM/yyyy');
  };

  const getDateStatus = (date: Date | null) => {
    if (!date) return { variant: 'secondary' as const, text: 'Não informado' };
    
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { variant: 'destructive' as const, text: 'Vencido' };
    } else if (diffDays <= 30) {
      return { variant: 'default' as const, text: 'Próximo ao vencimento' };
    } else {
      return { variant: 'secondary' as const, text: 'Em dia' };
    }
  };

  const CheckboxStatus = ({ checked }: { checked: boolean }) => (
    <div className="flex items-center gap-1">
      {checked ? (
        <>
          <Check className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-600">Sim</span>
        </>
      ) : (
        <>
          <X className="h-4 w-4 text-red-600" />
          <span className="text-sm text-red-600">Não</span>
        </>
      )}
    </div>
  );

  if (collaborators.length === 0) {
    return (
      <Card className="w-full max-w-6xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Nenhum colaborador cadastrado ainda.
            <br />
            Use o formulário acima para adicionar colaboradores.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Colaboradores Cadastrados ({collaborators.length})
          </CardTitle>
          <Button onClick={onDownloadCSV} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Baixar CSV
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {collaborators.map((collaborator) => (
            <div
              key={collaborator.id}
              className="border rounded-lg p-4 space-y-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{collaborator.nomeCompleto}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 text-sm text-muted-foreground">
                    <p>CPF: {collaborator.cpf}</p>
                    <p>Empresa: {collaborator.empresa}</p>
                    <p>Unidade: {collaborator.unidade}</p>
                    <p>Grupo: {collaborator.grupo}</p>
                    <p>Setor: {collaborator.setor}</p>
                    {collaborator.gestor && <p>Gestor: {collaborator.gestor}</p>}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveCollaborator(collaborator.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {[
                  { label: 'Integração', date: collaborator.integracao },
                  { label: 'ASO', date: collaborator.aso },
                  { label: 'NR10', date: collaborator.nr10 },
                  { label: 'NR10-SEP', date: collaborator.nr10Sep },
                  { label: 'NR11', date: collaborator.nr11 },
                  { label: 'NR12', date: collaborator.nr12 },
                  { label: 'NR18', date: collaborator.nr18 },
                  { label: 'NR18 Andaime', date: collaborator.nr18Andaime },
                  { label: 'NR20', date: collaborator.nr20 },
                  { label: 'NR33', date: collaborator.nr33 },
                  { label: 'NR35', date: collaborator.nr35 },
                  { label: 'NR34', date: collaborator.nr34 },
                  { label: 'PGRO/PCMAT', date: collaborator.pgroPcmat },
                  { label: 'PCMSO', date: collaborator.pcmso },
                  { label: 'PPR', date: collaborator.ppr },
                  { label: 'Loto', date: collaborator.loto },
                  { label: 'PTA Plataforma', date: collaborator.ptaPlataforma },
                ].map(({ label, date }) => (
                  <div key={label} className="space-y-1">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-sm">{formatDate(date)}</p>
                    <Badge variant={getDateStatus(date).variant} className="text-xs">
                      {getDateStatus(date).text}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Nova seção para os checkboxes */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold mb-3">Documentação Adicional</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Treinamento</p>
                    <CheckboxStatus checked={collaborator.treinamento} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">OS</p>
                    <CheckboxStatus checked={collaborator.os} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Documentação</p>
                    <CheckboxStatus checked={collaborator.documentacao} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">APR/PAE</p>
                    <CheckboxStatus checked={collaborator.aprPae} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">EPI</p>
                    <CheckboxStatus checked={collaborator.epi} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">CIPA</p>
                    <CheckboxStatus checked={collaborator.cipa} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaboratorList;
