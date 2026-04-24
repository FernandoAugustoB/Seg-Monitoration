export interface Client {
  id: number;
  name: string;
  status: 'Ativo' | 'Inativo';
  description: string;
  cameras: { name: string; status: 'Online' | 'Offline'; issue?: string }[];
  openCards: { id: string; title: string; priority: 'Alta' | 'Média' | 'Baixa' }[];
  operationLog: { date: string; event: string }[];
}