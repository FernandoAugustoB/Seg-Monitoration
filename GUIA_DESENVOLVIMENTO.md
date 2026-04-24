# 🚀 Guia de Desenvolvimento - Seg-Monitoration

## 🎯 Objetivos Alcançados

✅ Estrutura base do projeto Angular 21+  
✅ Modelos de dados (7 tipos de entidades)  
✅ Serviços core com CRUD mockado (9 serviços)  
✅ Sistema de autenticação  
✅ Guards de proteção de rotas  
✅ Dados mockados completos  
✅ Componentes iniciais (Login, Dashboard, Clients, Cameras, Notifications)  
✅ Tailwind CSS configurado  
✅ Tema escuro implementado  
✅ Fonte Inter aplicada  

## 🔄 Fluxo de Trabalho Recomendado

### 1️⃣ Primeira Execução

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start

# Acessar: http://localhost:4200
```

### 2️⃣ Testar Autenticação

```
Login como: operador1
Senha: 123456
```

Após login, você será redirecionado para o dashboard.

### 3️⃣ Próximas Features a Desenvolver

## 📋 Checklist de Desenvolvimento

### FASE 1: Layout Principal (Alta Prioridade)
- [ ] **HeaderComponent** (`shared/header/`)
  - [ ] Logo + título
  - [ ] Busca rápida de clientes (integrar ClienteService)
  - [ ] Nome do usuário logado
  - [ ] Indicador de turno com cores (verde/amarelo/vermelho)
  - [ ] Contador de notificações
  - [ ] Botão de logout

- [ ] **SidebarComponent** (`shared/sidebar/`)
  - [ ] Menu de navegação
  - [ ] Links para: Dashboard, Clientes, Câmeras, Cards, Notificações, Mensagens
  - [ ] Indicador de página ativa
  - [ ] Menu colapsável em mobile

- [ ] **LayoutComponent** (`shared/layout/`)
  - [ ] Combinar Header + Sidebar + RouterOutlet
  - [ ] Aplicar em todas as páginas (exceto login)
  - [ ] Responsivo

### FASE 2: Feature de Clientes (Alta Prioridade)
- [ ] **ClientDetailsComponent** (`clients/client-details/`)
  - [ ] Modal/page de detalhes
  - [ ] Abas: Cards, Câmeras, Histórico, Informações, Comentários
  - [ ] Exibir cards abertos do cliente
  - [ ] Listar câmeras com status
  - [ ] Log de operações
  - [ ] Campo de comentário

- [ ] **ClientDetailCardComponent**
  - [ ] Exibir cards em lista ou grid
  - [ ] Mostrar status, urgência, designação

### FASE 3: Feature de Cards (Kanban) (Alta Prioridade)
- [ ] **CardsKanbanComponent** (`cards/cards-kanban/`)
  - [ ] Board tipo Trello/Azure DevOps
  - [ ] 4 colunas: Identificado, Repassado, Em Progresso, Finalizado
  - [ ] Drag & drop entre colunas
  - [ ] Cores por urgência
  - [ ] Clique para ver detalhes

- [ ] **CardDetailsComponent** (`cards/card-details/`)
  - [ ] Detalhes completos do card
  - [ ] Editor de atribuição
  - [ ] Seletor de urgência
  - [ ] Seção de comentários
  - [ ] Timeline de logs

### FASE 4: Feature de Câmeras (Média Prioridade)
- [ ] **CameraDetailsComponent** (`cameras/camera-details/`)
  - [ ] Detalhes da câmera
  - [ ] Status em tempo real
  - [ ] Histórico de problemas
  - [ ] Data de última manutenção

### FASE 5: Feature de Notificações (Média Prioridade)
- [ ] Melhorar NotificationsComponent
  - [ ] Toast notifications em tempo real
  - [ ] Filtros por tipo
  - [ ] Paginação

### FASE 6: Feature de Mensagens (Média Prioridade)
- [ ] **MessageListComponent** (`messaging/message-list/`)
- [ ] **SendMessageComponent** (`messaging/send-message/`)
  - [ ] Enviar para usuários individuais
  - [ ] Enviar para grupos
  - [ ] Histórico de mensagens
  - [ ] Marcar como lido

### FASE 7: Componentes Compartilhados (Baixa Prioridade)
- [ ] Pipes customizados
  - [ ] `ShiftStatusPipe` (mostra turno formatado)
  - [ ] `CameraStatusPipe` (cores e ícones)
  
- [ ] Diretivas
  - [ ] `ShiftWarningDirective` (aviso 30 min antes de acabar)
  
- [ ] Utilitários
  - [ ] Validadores customizados
  - [ ] Formatadores de data/hora

## 📁 Criando Novo Componente

```bash
# Usando Angular CLI
ng generate component features/cards/cards-kanban --skip-tests

# Estrutura criada:
# src/app/features/cards/cards-kanban/
#   ├── cards-kanban.component.ts
#   ├── cards-kanban.component.html
#   └── cards-kanban.component.css
```

## 💡 Padrões do Projeto

### Componentes
```typescript
// Sempre usar standalone: true
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule, FormsModule, ...],
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.css']
})
```

### Serviços
```typescript
// Usar providedIn: 'root'
@Injectable({
  providedIn: 'root'
})
export class MyService { ... }
```

### Tailwind
```html
<!-- Usar classes do Tailwind para estilo -->
<!-- Tema escuro: preto, cinza escuro (slate-xxx), amarelo (#fbbf24, #f59e0b) -->
<div class="bg-slate-800 text-white border border-yellow-600">
  <h1 class="text-yellow-500">Título</h1>
  <button class="bg-yellow-600 hover:bg-yellow-700 text-black">
    Botão
  </button>
</div>
```

## 🧪 Testando Features

### Teste de Autenticação
```typescript
// Em um componente
constructor(private authService: AuthService) {
  const user = this.authService.getCurrentUser();
  console.log(user);
}
```

### Teste de Serviço
```typescript
// Em um componente
constructor(private clienteService: ClienteService) {}

ngOnInit() {
  this.clienteService.getClientes().subscribe(data => {
    console.log(data);
  });
}
```

## 🎨 Guia de Cores

```css
/* Primária (Amarelo/Laranja) */
#fbbf24 (400) /* Hover */
#f59e0b (500) /* Padrão */
#d97706 (600) /* Dark hover */

/* Fundo */
#000000 /* Black */
#1a1a2e /* Dark blue-black */
#0f172a /* Slate-900 */

/* Texto */
#ffffff /* Branco puro */
#e2e8f0 /* Slate-200 */
#94a3b8 /* Slate-400 */

/* Estados */
Verde: #16a34a (success)
Vermelho: #dc2626 (error/critical)
Amarelo: #eab308 (warning)
```

## 📚 Recursos Úteis

- [Angular Docs](https://angular.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [RxJS](https://rxjs.dev)
- [TypeScript](https://www.typescriptlang.org)

## ⚠️ Cuidados Importantes

1. **Dados são ephemeral** - Ao atualizar a página, todos os dados são perdidos (mockados em memória)
2. **Sem banco de dados real** - Está tudo mockado
3. **Autenticação simulada** - Sem tokens reais, apenas token mock
4. **Sem erros HTTP** - Os serviços sempre resolvem com sucesso

## 🔄 Próximas Etapas Recomendadas

1. **Curto prazo** (1-2 semanas)
   - Implementar Layout (Header + Sidebar)
   - Completar feature de Clientes
   - Implementar Kanban de Cards

2. **Médio prazo** (2-4 semanas)
   - Feature de Mensagens
   - Melhorias de Notificações
   - Componentes compartilhados

3. **Longo prazo** (1-2 meses)
   - Integração com API real
   - Sistema autêntico de autenticação (JWT)
   - Banco de dados real
   - Testes automatizados
   - PWA (Progressive Web App)

---

**Última Atualização**: 23 de Abril de 2026
**Versão do Projeto**: 1.0.0 (Beta)
