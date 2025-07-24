
export interface Collaborator {
  id: string;
  nomeCompleto: string;
  cpf: string;
  empresa: string;
  cnpj: string;
  novaEmpresa: string;
  unidade: string;
  grupo: string;
  setor: string;
  gestor: string;
  integracao: Date | null;
  aso: Date | null;
  nr10: Date | null;
  nr10Sep: Date | null;
  nr11: Date | null;
  nr12: Date | null;
  nr18: Date | null;
  nr18Andaime: Date | null;
  nr20: Date | null;
  nr33: Date | null;
  nr35: Date | null;
  nr34: Date | null;
  pgroPcmat: Date | null;
  pcmso: Date | null;
  ppr: Date | null;
  loto: Date | null;
  ptaPlataforma: Date | null;
  treinamento: boolean;
  os: boolean;
  documentacao: boolean;
  aprPae: boolean;
  epi: boolean;
  cipa: boolean;
}
