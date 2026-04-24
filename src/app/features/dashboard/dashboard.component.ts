import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShiftLog, ShiftTask } from '../../core/models/shift.model';
import { AuthService } from '../../core/services/auth.service';
import { ShiftService } from '../../core/services/shift.service';
import { AuthUser } from '../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentShift: ShiftLog | null = null;
  currentUser: AuthUser | null = null;
  descricaoInicio = '';
  descricaoFim = '';
  showEndForm = false;
  shiftTasks: ShiftTask[] = [
    {
      id: 'task_1',
      nome: 'Verificar câmeras',
      descricao: 'Fazer varredura de todas as câmeras do cliente',
      fase: 'inicio',
      status: 'pendente'
    },
    {
      id: 'task_2',
      nome: 'Testar sistemas de alarme',
      descricao: 'Testar funcionamento dos alarmes',
      fase: 'inicio',
      status: 'pendente'
    },
    {
      id: 'task_3',
      nome: 'Patrulha noturna',
      descricao: 'Realizar patrulha nas áreas externas',
      fase: 'meio',
      status: 'pendente'
    },
    {
      id: 'task_4',
      nome: 'Ronda final',
      descricao: 'Ronda de encerramento do plantão',
      fase: 'final',
      status: 'pendente'
    }
  ];

  constructor(
    private authService: AuthService,
    private shiftService: ShiftService
  ) {}

  ngOnInit(): void {
    this.currentShift = this.shiftService.getCurrentShift();
    this.currentUser = this.authService.getCurrentUser();
  }

  startShift(): void {
    if (!this.descricaoInicio.trim()) {
      alert('Por favor, descreva o início do plantão');
      return;
    }

    const shiftType = this.currentUser?.shiftStart === '06:00' ? 'diurno' : 'noturno';

    this.shiftService.startShift(
      this.currentUser?.id || '',
      shiftType,
      this.descricaoInicio,
      this.shiftTasks
    ).subscribe({
      next: (shift) => {
        this.currentShift = shift;
        this.descricaoInicio = '';
      },
      error: (err) => {
        alert('Erro ao iniciar plantão: ' + err);
      }
    });
  }

  completeTask(taskId: string): void {
    if (!this.currentShift) return;

    this.shiftService.completeTask(this.currentShift.id, taskId).subscribe({
      next: (shift) => {
        if (shift) {
          this.currentShift = shift;
        }
      },
      error: (err) => {
        alert('Erro ao atualizar tarefa: ' + err);
      }
    });
  }

  endShift(): void {
    if (!this.descricaoFim.trim()) {
      alert('Por favor, descreva o final do plantão');
      return;
    }

    if (!this.currentShift) return;

    this.shiftService.endShift(this.currentShift.id, this.descricaoFim).subscribe({
      next: (shift) => {
        this.currentShift = null;
        this.descricaoFim = '';
        this.showEndForm = false;
        alert('Plantão finalizado com sucesso!');
      },
      error: (err) => {
        alert('Erro ao finalizar plantão: ' + err);
      }
    });
  }

  getTasksByFase(fase: string): ShiftTask[] {
    return this.currentShift?.tarefas.filter(t => t.fase === fase) || [];
  }

  getCompletedTasksCount(): number {
    return this.currentShift?.tarefas.filter(t => t.status === 'concluido').length || 0;
  }

  getTotalTasksCount(): number {
    return this.currentShift?.tarefas.length || 0;
  }
}
