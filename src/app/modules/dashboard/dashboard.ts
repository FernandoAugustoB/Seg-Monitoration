import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  startShiftLog = signal('');
  endShiftLog = signal('');

  tasks = signal([
    { id: 1, label: 'Trocar o login logo após assumir plantão.', category: 'Início', completed: false },
    { id: 2, label: 'Relatório de clientes offline.', category: 'Início', completed: false },
    { id: 3, label: 'Visualizar plantão dos operadores.', category: 'Início', completed: false },
    { id: 4, label: 'Relatório início do plantão das câmeras (privadas e públicas).', category: 'Início', completed: false },
    { id: 5, label: 'Verificação das câmeras Publico e Privado.', category: 'Início', completed: false },
    { id: 6, label: 'Verificar se tem algum contato no whatsapp que não esta salvo..', category: 'Meio', completed: false },
    { id: 7, label: 'Repassar informações das câmeras para o Allan.', category: 'Meio', completed: false },
    { id: 7, label: 'Alimentar o Trello com as informações necessárias.', category: 'Meio', completed: false },
    { id: 7, label: 'Enviar fotos das rondas.', category: 'Meio', completed: false },
    { id: 7, label: 'Verificar falhas de comunicação.', category: 'Meio', completed: false },
    { id: 7, label: 'Abrir O.S. quando necessário.', category: 'Meio', completed: false },
    { id: 8, label: 'Fazer o final de plantão com todas as informações.', category: 'Final', completed: false },
    { id: 9, label: 'Fazer ata do turno.', category: 'Final', completed: false },
    { id: 9, label: 'Realizar limpeza da base.', category: 'Final', completed: false },
  ]);

  saveLog() {
    console.log('Log salvo localmente para demonstração:', {
      inicio: this.startShiftLog(),
      fim: this.endShiftLog(),
      tasks: this.tasks()
    });
    alert('Relatório de plantão salvo com sucesso!');
  }
}