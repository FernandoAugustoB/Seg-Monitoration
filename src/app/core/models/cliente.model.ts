export type ClienteStatus = 'active' | 'inactive';

export interface Cliente {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  telefone: string;
  email: string;
  status: ClienteStatus;
  qtdCameras: number;
  statusGeral: 'normal' | 'critico';
  cameras?: string[]; // Camera IDs
  cardsAtivos?: string[]; // Card IDs
  procedimentoPadrao: string;
  criadoEm: Date;
  atualizadoEm: Date;
}