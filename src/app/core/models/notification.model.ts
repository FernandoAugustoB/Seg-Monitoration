export type NotificationType = 'card' | 'message' | 'alert' | 'info';

export interface Notification {
  id: string;
  usuarioId: string;
  titulo: string;
  descricao: string;
  tipo: NotificationType;
  visualizado: boolean;
  dataVisualizacao?: Date;
  dataEnvio: Date;
  linkId?: string; // ID da tela ou card para redirecionamento
  linkType?: 'card' | 'client' | 'camera' | 'message';
}
