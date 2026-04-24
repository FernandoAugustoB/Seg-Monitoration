# Estrutura do Projeto - Seg-Monitoration

## 📋 Visão Geral

O projeto foi estruturado seguindo as especificações definidas em `project.md`. Aqui está a organização atual:

## 📁 Estrutura de Diretórios

```
src/
├── app/
│   ├── core/
│   │   ├── models/           # Interfaces e tipos de dados
│   │   │   ├── user.model.ts         # User, AuthUser
│   │   │   ├── cliente.model.ts      # Cliente
│   │   │   ├── camera.model.ts       # Camera
│   │   │   ├── card.model.ts         # Card
│   │   │   ├── notification.model.ts # Notification
│   │   │   ├── message.model.ts      # Message
│   │   │   ├── permission.model.ts   # Permission, UserGroup
│   │   │   └── shift.model.ts        # ShiftLog, ShiftTask
│   │   ├── services/        # Lógica de negócio
│   │   │   ├── auth.service.ts       # Autenticação
│   │   │   ├── cliente.service.ts    # Gestão de clientes
│   │   │   ├── camera.service.ts     # Gestão de câmeras
│   │   │   ├── card.service.ts       # Gestão de cards
│   │   │   ├── notification.service.ts # Notificações
│   │   │   ├── message.service.ts    # Mensagens
│   │   │   ├── permission.service.ts # Permissões
│   │   │   └── shift.service.ts      # Gestão de plantões
│   │   └── guards/         # Proteção de rotas
│   │       ├── auth.guard.ts         # Verifica autenticação
│   │       └── role.guard.ts         # Verifica role do usuário
│   ├── features/            # Módulos/features da aplicação
│   │   ├── auth/
│   │   │   └── login/
│   │   │       ├── login.component.ts
│   │   │       └── login.component.html
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts
│   │   │   └── dashboard.component.html
│   │   ├── clients/
│   │   │   ├── clients-list/
│   │   │   │   ├── clients-list.component.ts
│   │   │   │   └── clients-list.component.html
│   │   │   └── client-details/    # (próximo passo)
│   │   ├── cameras/
│   │   │   ├── cameras-list/
│   │   │   │   ├── cameras-list.component.ts
│   │   │   │   └── cameras-list.component.html
│   │   │   └── camera-details/    # (próximo passo)
│   │   ├── cards/
│   │   │   ├── cards-kanban/           # (próximo passo)
│   │   │   └── card-details/           # (próximo passo)
│   │   ├── notifications/
│   │   │   ├── notifications.component.ts
│   │   │   └── notifications.component.html
│   │   └── messaging/
│   │       └── message-list/           # (próximo passo)
│   ├── shared/             # Componentes e utilitários compartilhados
│   │   ├── header/                 # (próximo passo)
│   │   ├── sidebar/                # (próximo passo)
│   │   ├── layout/                 # (próximo passo)
│   │   ├── pipes/
│   │   ├── directives/
│   │   └── utils/
│   ├── app.ts             # Componente raiz
│   ├── app.html
│   ├── app.css
│   ├── app.config.ts      # Configuração da aplicação
│   └── app.routes.ts      # Definição de rotas
├── assets/                # Imagens, ícones, etc.
├── constants/
│   └── mock-data.ts       # Dados mockados para desenvolvimento
├── styles/
│   └── styles.css         # Estilos globais
├── main.ts                # Ponto de entrada
├── index.html
└── styles.css             # Estilos globais
```

## 🔐 Sistema de Autenticação

### Usuários de Teste:
- **Operador 1**: username `operador1` | senha `123456`
- **Operador 2**: username `operador2` | senha `123456`
- **Supervisor**: username `supervisor` | senha `123456`

### Roles:
- `operator`: Acesso limitado a visualização e comentários
- `supervisor`: Acesso total e gestão de permissões

## 🎨 Design & Estilo

- **Tema**: Escuro (preto, cinza escuro, amarelo/laranja)
- **Framework CSS**: Tailwind CSS
- **Fonte**: Inter
- **Ícones**: PrimeNG Icons
- **Sem biblioteca de componentes**: Componentes customizados

## 📦 Dados Mockados

Os dados mockados estão em `src/constants/mock-data.ts`:

- **MOCK_USERS**: Três usuários para testes
- **MOCK_CLIENTES**: 3 clientes com informações detalhadas
- **MOCK_CAMERAS**: 5 câmeras com status e problemas
- **MOCK_CARDS**: 2 cards de exemplo
- **MOCK_NOTIFICATIONS**: 3 notificações
- **MOCK_MESSAGES**: 2 mensagens
- **MOCK_PERMISSIONS**: 7 permissões
- **MOCK_USER_GROUPS**: 2 grupos de usuários

## 🔄 Serviços Disponíveis

### AuthService
- `login()`: Autentica usuário
- `logout()`: Desautentica
- `isAuthenticated()`: Verifica se autenticado
- `getCurrentUser()`: Retorna usuário atual
- `hasRole()`: Verifica role do usuário

### ClienteService
- `getClientes()`: Lista todos os clientes
- `searchClientes()`: Busca clientes
- `getClienteById()`: Obtém cliente por ID
- `selectClient()`: Seleciona cliente
- CRUD completo

### CameraService
- `getCameras()`: Lista todas as câmeras
- `getCamerasByCliente()`: Câmeras de um cliente
- `searchCameras()`: Busca câmeras
- CRUD completo

### CardService
- `getCards()`: Lista todos os cards
- `getCardsByStatus()`: Filtra por status
- `getCardsByCliente()`: Cards de um cliente
- `addCommentToCard()`: Adiciona comentário
- CRUD completo

### NotificationService
- `getNotifications()`: Notificações do usuário
- `getUnreadNotifications()`: Não lidas
- `markAsRead()`: Marca como lida
- `markAllAsRead()`: Marca todas como lidas

### MessageService
- `getMessages()`: Mensagens do usuário
- `getUnreadMessages()`: Não lidas
- `sendMessage()`: Envia mensagem
- `markAsRead()`: Marca como lida

### PermissionService
- `checkPermission()`: Verifica permissão
- Gestão de grupos e permissões

### ShiftService
- `startShift()`: Inicia plantão
- `endShift()`: Encerra plantão
- `completeTask()`: Marca tarefa como concluída
- `getShiftsByUser()`: Plantões do usuário

## 🛣️ Rotas Configuradas

- `/login` - Tela de login
- `/dashboard` - Dashboard (protegido)
- `/` - Redireciona para dashboard
- `**` - Redireciona para dashboard

## ⏭️ Próximas Etapas

1. **Componentes de Layout** (`shared/header`, `shared/sidebar`, `shared/layout`)
   - Header com busca rápida e notificações
   - Barra lateral de navegação
   - Layout principal com header + sidebar

2. **Feature de Clientes**
   - `client-details`: Modal/página de detalhes do cliente com:
     - Cards abertos
     - Lista de câmeras
     - Log de operações
     - Campo de comentário

3. **Feature de Cards** (Kanban)
   - `cards-kanban`: Board tipo Trello/Azure com colunas:
     - Identificado
     - Repassado
     - Em Progresso
     - Finalizado
   - `card-details`: Detalhes do card

4. **Feature de Mensagens**
   - `message-list`: Lista de mensagens
   - Envio de mensagens para usuários/grupos

5. **Componentes Compartilhados**
   - Pipes customizados
   - Diretivas úteis
   - Utilidades

6. **Melhorias de UX**
   - Validações de formulários
   - Tratamento de erros
   - Feedback visual (toast notifications)
   - Indicador de turno (com cores de aviso)

7. **Testes**
   - Testes unitários (Jasmine)
   - Testes E2E (Cypress/Playwright)

## 🚀 Comandos

```bash
# Iniciar desenvolvimento
npm start

# Build para produção
npm run build

# Testes
npm test

# Lint
npm run lint
```

## 📝 Observações Importantes

- Todos os dados são mockados (sem API real)
- Autenticação é simples (sem JWT real)
- Dados são armazenados em BehaviorSubjects (perdidos ao atualizar)
- Próxima fase: Integração com API real
- Tema escuro está implementado com Tailwind
- Responsive design em progresso

---

**Data de Criação**: 23 de Abril de 2026
**Versão Angular**: 21+
**Status**: Estrutura base completa, pronto para expansão
