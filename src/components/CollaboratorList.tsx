
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Users, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { Collaborator } from '@/types/collaborator';
import { toast } from '@/hooks/use-toast';

interface CollaboratorListProps {
  collaborators: Collaborator[];
  onRemoveCollaborator: (id: string) => void;
  onSendEmail: () => void;
}

const CollaboratorList: React.FC<CollaboratorListProps> = ({ 
  collaborators, 
  onRemoveCollaborator, 
  onSendEmail 
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

  if (collaborators.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
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
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Colaboradores Cadastrados ({collaborators.length})
          </CardTitle>
          <Button onClick={onSendEmail} className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Enviar por Email
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {collaborators.map((collaborator) => (
            <div
              key={collaborator.id}
              className="border rounded-lg p-4 space-y-3 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{collaborator.nome}</h3>
                  <p className="text-sm text-muted-foreground">CPF: {collaborator.cpf}</p>
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Data da ASO</p>
                  <p className="text-sm">{formatDate(collaborator.dataAso)}</p>
                  <Badge variant={getDateStatus(collaborator.dataAso).variant} className="text-xs">
                    {getDateStatus(collaborator.dataAso).text}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Data da NR10</p>
                  <p className="text-sm">{formatDate(collaborator.dataNr10)}</p>
                  <Badge variant={getDateStatus(collaborator.dataNr10).variant} className="text-xs">
                    {getDateStatus(collaborator.dataNr10).text}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Data da NR12</p>
                  <p className="text-sm">{formatDate(collaborator.dataNr12)}</p>
                  <Badge variant={getDateStatus(collaborator.dataNr12).variant} className="text-xs">
                    {getDateStatus(collaborator.dataNr12).text}
                  </Badge>
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
