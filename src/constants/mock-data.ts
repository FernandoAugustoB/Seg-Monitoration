import { Cliente } from "../app/core/models/cliente.model";

export const CLIENTES_MOCK: Cliente[] = [
  {
    id: 1,
    nome: "Condomínio Solar das Palmeiras",
    endereco: "Rua das Flores, 123",
    qtdCameras: 12,
    statusGeral: 'critico',
    procedimentoPadrao: "Em caso de invasão, acionar viatura 04 e ligar para o síndico Sr. João.",
    cameras: [
      { id: 'c1', nome: 'Portaria Principal', status: 'online' },
      { id: 'c2', nome: 'Muro Leste', status: 'offline' }
    ],
    cardsAtivos: [
      { id: 't1', titulo: 'Câmera Muro Leste sem imagem', status: 'aberto', prioridade: 'alta' }
    ]
  },
  {
    id: 2,
    nome: "Supermercado Extra",
    endereco: "Av. Central, 500",
    qtdCameras: 32,
    statusGeral: 'normal',
    procedimentoPadrao: "Verificar fundo da loja a cada 1 hora.",
    cameras: [],
    cardsAtivos: []
  }
];