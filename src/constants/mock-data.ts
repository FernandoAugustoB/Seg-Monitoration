import { Camera } from "../app/core/models/camera.model";
import { Card } from "../app/core/models/card.model";
import { Cliente } from "../app/core/models/cliente.model";
import { Message } from "../app/core/models/message.model";
import { Notification } from "../app/core/models/notification.model";
import { Permission, UserGroup } from "../app/core/models/permission.model";
import { User } from "../app/core/models/user.model";

// ==================== USUÁRIOS ====================
export const MOCK_USERS: User[] = [
  {
    id: 'user_1',
    username: 'operador1',
    password: '123456',
    fullName: 'João Silva',
    role: 'operator',
    shiftStart: '06:00',
    shiftEnd: '18:00',
    active: true,
    permissions: ['view_clients', 'view_cameras', 'view_cards', 'create_comment']
  },
  {
    id: 'user_2',
    username: 'operador2',
    password: '123456',
    fullName: 'Maria Santos',
    role: 'operator',
    shiftStart: '18:00',
    shiftEnd: '06:00',
    active: true,
    permissions: ['view_clients', 'view_cameras', 'view_cards', 'create_comment']
  },
  {
    id: 'user_3',
    username: 'supervisor',
    password: '123456',
    fullName: 'Carlos Oliveira',
    role: 'supervisor',
    shiftStart: '06:00',
    shiftEnd: '18:00',
    active: true,
    permissions: ['view_all', 'manage_users', 'manage_permissions', 'send_messages']
  }
];

// ==================== CLIENTES ====================
export const MOCK_CLIENTES: Cliente[] = [
  {
    id: 'client_1',
    nome: 'Condomínio Solar das Palmeiras',
    descricao: 'Condomínio residencial de luxo com 150 unidades',
    endereco: 'Rua das Flores, 123 - Zona Sul',
    telefone: '(11) 3456-7890',
    email: 'contato@solarpalmeiras.com.br',
    status: 'active',
    qtdCameras: 12,
    statusGeral: 'critico',
    cameras: ['camera_1', 'camera_2'],
    cardsAtivos: ['card_1'],
    procedimentoPadrao: 'Em caso de invasão, acionar viatura 04 e ligar para o síndico Sr. João.',
    criadoEm: new Date('2024-01-15'),
    atualizadoEm: new Date('2024-04-20')
  },
  {
    id: 'client_2',
    nome: 'Supermercado Extra',
    descricao: 'Supermercado de grande porte com 5 lojas',
    endereco: 'Av. Central, 500 - Centro',
    telefone: '(11) 3456-1234',
    email: 'security@extra.com.br',
    status: 'active',
    qtdCameras: 32,
    statusGeral: 'normal',
    cameras: ['camera_3', 'camera_4', 'camera_5'],
    cardsAtivos: [],
    procedimentoPadrao: 'Verificar fundo da loja a cada 1 hora. Patrulha no estacionamento a cada 30 min.',
    criadoEm: new Date('2023-06-01'),
    atualizadoEm: new Date('2024-04-19')
  },
  {
    id: 'client_3',
    nome: 'Banco Seguro',
    descricao: 'Agência bancária com sistema de segurança avançado',
    endereco: 'Av. Paulista, 1000 - Bela Vista',
    telefone: '(11) 3456-5678',
    email: 'seguranca@bancoseguro.com.br',
    status: 'active',
    qtdCameras: 18,
    statusGeral: 'normal',
    cameras: [],
    cardsAtivos: ['card_2'],
    procedimentoPadrao: 'Verificação de cofre a cada 4 horas. Escolta de malotes 2x ao dia.',
    criadoEm: new Date('2023-03-10'),
    atualizadoEm: new Date('2024-04-21')
  }
];

// ==================== CÂMERAS ====================
export const MOCK_CAMERAS: Camera[] = [
  {
    id: 'camera_1',
    clienteId: 'client_1',
    nome: 'Portaria Principal',
    localizacao: 'Entrada frontal do condomínio',
    status: 'online',
    ultimaManutencao: new Date('2024-03-15'),
    criadoEm: new Date('2024-01-20'),
    atualizadoEm: new Date('2024-04-20')
  },
  {
    id: 'camera_2',
    clienteId: 'client_1',
    nome: 'Muro Leste',
    localizacao: 'Lateral leste do condomínio',
    status: 'offline',
    ultimaManutencao: new Date('2024-02-10'),
    problem: {
      level: 'high',
      descricao: 'Câmera sem sinal de vídeo',
      dataDeteccao: new Date('2024-04-18')
    },
    criadoEm: new Date('2024-01-20'),
    atualizadoEm: new Date('2024-04-18')
  },
  {
    id: 'camera_3',
    clienteId: 'client_2',
    nome: 'Caixa 01',
    localizacao: 'Caixa 01 - Loja centro',
    status: 'online',
    ultimaManutencao: new Date('2024-04-10'),
    criadoEm: new Date('2023-06-05'),
    atualizadoEm: new Date('2024-04-20')
  },
  {
    id: 'camera_4',
    clienteId: 'client_2',
    nome: 'Estacionamento',
    localizacao: 'Estacionamento - Loja centro',
    status: 'alerta',
    ultimaManutencao: new Date('2024-03-20'),
    problem: {
      level: 'medium',
      descricao: 'Imagem com qualidade reduzida',
      dataDeteccao: new Date('2024-04-19')
    },
    criadoEm: new Date('2023-06-05'),
    atualizadoEm: new Date('2024-04-19')
  },
  {
    id: 'camera_5',
    clienteId: 'client_2',
    nome: 'Corredor Fundo',
    localizacao: 'Corredor de acesso ao fundo',
    status: 'online',
    ultimaManutencao: new Date('2024-04-01'),
    criadoEm: new Date('2023-06-05'),
    atualizadoEm: new Date('2024-04-20')
  }
];

// ==================== CARDS ====================
export const MOCK_CARDS: Card[] = [
  {
    id: 'card_1',
    clienteId: 'client_1',
    titulo: 'Câmera Muro Leste sem imagem',
    descricao: 'Câmera do muro leste não está transmitindo sinal de vídeo. Necessário enviar técnico para verificar.',
    status: 'identificado',
    urgencia: 'alta',
    destinadoPara: 'user_1',
    criadoPor: 'user_3',
    criadoEm: new Date('2024-04-18'),
    atualizadoEm: new Date('2024-04-18'),
    comentarios: [
      {
        id: 'comment_1',
        utilisername: 'João Silva',
        conteudo: 'Já identifiquei o problema. Preciso de autorização para chamar o técnico.',
        data: new Date('2024-04-18T10:30:00')
      }
    ],
    logs: [
      {
        id: 'log_1',
        acao: 'criado',
        usuario: 'Carlos Oliveira',
        data: new Date('2024-04-18T08:00:00'),
        descricao: 'Card criado pelo supervisor'
      },
      {
        id: 'log_2',
        acao: 'atribuido',
        usuario: 'Carlos Oliveira',
        data: new Date('2024-04-18T08:15:00'),
        descricao: 'Card atribuído a João Silva'
      }
    ]
  },
  {
    id: 'card_2',
    clienteId: 'client_3',
    titulo: 'Revisão de sistema de segurança',
    descricao: 'Revisão mensal do sistema de segurança do banco. Incluir testes de câmeras e alarmes.',
    status: 'em_progresso',
    urgencia: 'media',
    destinadoPara: 'user_2',
    criadoPor: 'user_3',
    criadoEm: new Date('2024-04-15'),
    atualizadoEm: new Date('2024-04-20'),
    comentarios: [],
    logs: []
  }
];

// ==================== NOTIFICAÇÕES ====================
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    usuarioId: 'user_1',
    titulo: 'Novo Card Atribuído',
    descricao: 'Você recebeu um novo card: "Câmera Muro Leste sem imagem"',
    tipo: 'card',
    visualizado: false,
    dataEnvio: new Date('2024-04-18T08:15:00'),
    linkId: 'card_1',
    linkType: 'card'
  },
  {
    id: 'notif_2',
    usuarioId: 'user_1',
    titulo: 'Alerta de Câmera',
    descricao: 'Câmera "Portaria Principal" apresenta sinal fraco',
    tipo: 'alert',
    visualizado: true,
    dataVisualizacao: new Date('2024-04-20T10:00:00'),
    dataEnvio: new Date('2024-04-20T09:30:00'),
    linkId: 'camera_1',
    linkType: 'camera'
  },
  {
    id: 'notif_3',
    usuarioId: 'user_2',
    titulo: 'Nova Mensagem',
    descricao: 'Você recebeu uma mensagem de Carlos Oliveira',
    tipo: 'message',
    visualizado: false,
    dataEnvio: new Date('2024-04-21T14:20:00'),
    linkId: 'msg_1',
    linkType: 'message'
  }
];

// ==================== MENSAGENS ====================
export const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg_1',
    enviadorId: 'user_3',
    assunto: 'Atualização de Procedimentos',
    conteudo: 'A partir de segunda-feira, há uma alteração nos procedimentos de checagem noturna. Favor revisar o documento anexado.',
    destinatatios: {
      usuarioIds: ['user_1', 'user_2']
    },
    visualizado: false,
    dataEnvio: new Date('2024-04-21T14:20:00')
  },
  {
    id: 'msg_2',
    enviadorId: 'user_3',
    assunto: 'Revisão de Permissões - Supervisores',
    conteudo: 'Solicitamos que todos os supervisores revisem as permissões dos operadores sob sua responsabilidade.',
    destinatatios: {
      grupoIds: ['group_supervisores']
    },
    visualizado: true,
    dataVisualizacao: new Date('2024-04-20T15:00:00'),
    dataEnvio: new Date('2024-04-20T13:00:00')
  }
];

// ==================== PERMISSÕES ====================
export const MOCK_PERMISSIONS: Permission[] = [
  {
    id: 'perm_1',
    nome: 'Ver Clientes',
    descricao: 'Permite visualizar a lista de clientes',
    recurso: 'clients',
    acao: 'view'
  },
  {
    id: 'perm_2',
    nome: 'Editar Clientes',
    descricao: 'Permite editar informações de clientes',
    recurso: 'clients',
    acao: 'edit'
  },
  {
    id: 'perm_3',
    nome: 'Ver Câmeras',
    descricao: 'Permite visualizar câmeras',
    recurso: 'cameras',
    acao: 'view'
  },
  {
    id: 'perm_4',
    nome: 'Ver Cards',
    descricao: 'Permite visualizar cards',
    recurso: 'cards',
    acao: 'view'
  },
  {
    id: 'perm_5',
    nome: 'Criar Cards',
    descricao: 'Permite criar novos cards',
    recurso: 'cards',
    acao: 'create'
  },
  {
    id: 'perm_6',
    nome: 'Enviar Mensagens',
    descricao: 'Permite enviar mensagens para usuários',
    recurso: 'messages',
    acao: 'send'
  },
  {
    id: 'perm_7',
    nome: 'Gerenciar Usuários',
    descricao: 'Permite gerenciar usuários e permissões',
    recurso: 'users',
    acao: 'manage'
  }
];

// ==================== GRUPOS DE USUÁRIOS ====================
export const MOCK_USER_GROUPS: UserGroup[] = [
  {
    id: 'group_operadores',
    nome: 'Operadores',
    descricao: 'Grupo de operadores de segurança',
    usuarios: ['user_1', 'user_2'],
    permissoes: ['perm_1', 'perm_3', 'perm_4'],
    criadoEm: new Date('2024-01-10'),
    atualizadoEm: new Date('2024-04-10')
  },
  {
    id: 'group_supervisores',
    nome: 'Supervisores',
    descricao: 'Grupo de supervisores',
    usuarios: ['user_3'],
    permissoes: ['perm_1', 'perm_2', 'perm_3', 'perm_4', 'perm_5', 'perm_6', 'perm_7'],
    criadoEm: new Date('2024-01-10'),
    atualizadoEm: new Date('2024-04-10')
  }
];

// Para compatibilidade com código antigo
export const CLIENTES_MOCK = MOCK_CLIENTES;