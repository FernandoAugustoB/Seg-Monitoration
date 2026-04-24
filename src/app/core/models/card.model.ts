export type CardStatus = 'identificado' | 'repassado' | 'em_progresso' | 'finalizado';
export type CardUrgency = 'baixa' | 'media' | 'alta' | 'critica';

export interface CardComment {
  id: string;
  utilisername: string;
  conteudo: string;
  data: Date;
}

export interface CardLog {
  id: string;
  acao: string;
  usuario: string;
  data: Date;
  descricao?: string;
}

export interface Card {
  id: string;
  clienteId: string;
  titulo: string;
  descricao: string;
  status: CardStatus;
  urgencia: CardUrgency;
  destinadoPara?: string; // User ID ou User Group ID
  criadoPor: string;
  criadoEm: Date;
  atualizadoEm: Date;
  comentarios: CardComment[];
  logs: CardLog[];
}
