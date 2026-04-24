export type CameraStatus = 'online' | 'alerta' | 'offline';
export type ProblemLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Camera {
  id: string;
  clienteId: string;
  nome: string;
  localizacao: string;
  status: CameraStatus;
  ultimaManutencao?: Date;
  problem?: {
    level: ProblemLevel;
    descricao: string;
    dataDeteccao: Date;
  };
  criadoEm: Date;
  atualizadoEm: Date;
}
