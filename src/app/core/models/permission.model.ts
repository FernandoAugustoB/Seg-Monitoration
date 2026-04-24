export interface Permission {
  id: string;
  nome: string;
  descricao: string;
  recurso: string; // ex: 'clients', 'cameras', 'cards'
  acao: string; // ex: 'view', 'edit', 'delete'
}

export interface UserGroup {
  id: string;
  nome: string;
  descricao: string;
  usuarios: string[]; // User IDs
  permissoes: string[]; // Permission IDs
  criadoEm: Date;
  atualizadoEm: Date;
}
