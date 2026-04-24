export type ShiftType = 'diurno' | 'noturno';
export type TaskStatus = 'pendente' | 'concluido';

export interface ShiftTask {
  id: string;
  nome: string;
  descricao: string;
  fase: 'inicio' | 'meio' | 'final';
  status: TaskStatus;
}

export interface ShiftLog {
  id: string;
  usuarioId: string;
  dataInicio: Date;
  dataFim?: Date;
  tipo: ShiftType;
  descricaoInicio: string;
  descricaoFim?: string;
  tarefas: ShiftTask[];
}
