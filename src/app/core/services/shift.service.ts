import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { ShiftLog, ShiftTask } from '../models/shift.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private shiftLogs = new BehaviorSubject<ShiftLog[]>([]);
  private currentShift = new BehaviorSubject<ShiftLog | null>(null);

  shiftLogs$ = this.shiftLogs.asObservable();
  currentShift$ = this.currentShift.asObservable();

  constructor() {}

  startShift(
    usuarioId: string,
    tipo: 'diurno' | 'noturno',
    descricaoInicio: string,
    tarefas: ShiftTask[]
  ): Observable<ShiftLog> {
    const novoShift: ShiftLog = {
      id: this.generateId(),
      usuarioId,
      dataInicio: new Date(),
      tipo,
      descricaoInicio,
      tarefas
    };

    this.currentShift.next(novoShift);
    const logsAtualizados = [...this.shiftLogs.value, novoShift];
    this.shiftLogs.next(logsAtualizados);

    return of(novoShift).pipe(delay(300));
  }

  endShift(shiftId: string, descricaoFim: string): Observable<ShiftLog | null> {
    const shiftAtualizado = this.shiftLogs.value.find(s => s.id === shiftId);

    if (shiftAtualizado) {
      shiftAtualizado.dataFim = new Date();
      shiftAtualizado.descricaoFim = descricaoFim;
      this.shiftLogs.next([...this.shiftLogs.value]);
      this.currentShift.next(null);
    }

    return of(shiftAtualizado || null).pipe(delay(300));
  }

  completeTask(shiftId: string, taskId: string): Observable<ShiftLog | null> {
    const shiftAtualizado = this.shiftLogs.value.find(s => s.id === shiftId);

    if (shiftAtualizado) {
      const task = shiftAtualizado.tarefas.find(t => t.id === taskId);
      if (task) {
        task.status = 'concluido';
      }
      this.shiftLogs.next([...this.shiftLogs.value]);

      if (this.currentShift.value?.id === shiftId) {
        this.currentShift.next({ ...shiftAtualizado });
      }
    }

    return of(shiftAtualizado || null).pipe(delay(200));
  }

  getShiftsByUser(usuarioId: string): Observable<ShiftLog[]> {
    const resultado = this.shiftLogs.value.filter(s => s.usuarioId === usuarioId);
    return of(resultado).pipe(delay(200));
  }

  getCurrentShift(): ShiftLog | null {
    return this.currentShift.value;
  }

  private generateId(): string {
    return `shift_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
