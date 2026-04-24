import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inbox.html'
})
export class Inbox {
  authService = inject(AuthService);
  
  selectedMessage = signal<any>(null);
  
  // Mock de conversas/comunicados
  messages = signal([
    { 
      id: 1, 
      sender: 'Supervisor Allan', 
      subject: 'Diretriz de Plantão', 
      preview: 'Atenção a todos os operadores sobre o reforço...',
      content: 'Devido ao feriado prolongado, as rondas virtuais nos clientes do setor portuário devem ser intensificadas a cada 30 minutos.',
      date: '24/04/2026',
      time: '22:15',
      read: false,
      tag: 'Operacional'
    },
    { 
      id: 2, 
      sender: 'Sistema Vanguard', 
      subject: 'Atualização de Firmware Concluída', 
      preview: 'O servidor de gravação passou por...',
      content: 'A manutenção programada para os servidores de redundância foi finalizada com sucesso. Todos os links estão operantes.',
      date: '23/04/2026',
      time: '14:00',
      read: true,
      tag: 'Sistema'
    }
  ]);

  selectMessage(msg: any) {
    this.selectedMessage.set(msg);
    this.messages.update(list => 
      list.map(m => m.id === msg.id ? { ...m, read: true } : m)
    );
  }
}