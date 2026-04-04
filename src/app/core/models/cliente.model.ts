export interface Camera {
  id: string;
  nome: string;
  status: 'online' | 'alerta' | 'offline';
  ultimaManutencao?: Date;
}

export interface Card {
  id: string;
  titulo: string;
  status: 'aberto' | 'em_andamento' | 'concluido';
  prioridade: 'baixa' | 'media' | 'alta';
}

export interface Cliente {
  id: number;
  nome: string;
  endereco: string;
  qtdCameras: number;
  statusGeral: 'normal' | 'critico';
  cameras: Camera[];
  cardsAtivos: Card[];
  procedimentoPadrao: string;
}