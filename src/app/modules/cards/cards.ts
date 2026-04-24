import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cards.html'
})
export class Cards {
  selectedCard = signal<any | null>(null);
  showModal = signal(false);

  // Definição das colunas
  columns = signal([
    { id: 'todo', title: 'Identificado', color: 'border-blue-500' },
    { id: 'forwarded', title: 'Repassado', color: 'border-(--brand-primary)' },
    { id: 'progress', title: 'Em Progresso', color: 'border-purple-500' },
    { id: 'done', title: 'Finalizado', color: 'border-green-500' }
  ]);

  // Mock de cards
  cards = signal([
    { 
      id: 'CRD-102', 
      title: 'Câmera Offline - Cond. Solar', 
      status: 'todo', 
      priority: 'Alta', 
      assignedTo: 'Operador Silva',
      description: 'Câmera 02 do subsolo parou de enviar pacotes após oscilação de energia.',
      logs: ['24/04 03:15 - Card criado pelo sistema'],
      comments: 2
    },
    { 
      id: 'CRD-105', 
      title: 'Acesso Não Autorizado', 
      status: 'forwarded', 
      priority: 'Crítica', 
      assignedTo: 'Supervisor Fernando',
      description: 'Tentativa de invasão detectada na doca 4 do Supermercado Central.',
      logs: ['24/04 01:20 - Card movido para Repassado'],
      comments: 5
    }
  ]);

  getCardsByStatus(status: string) {
    return this.cards().filter(c => c.status === status);
  }

  openCard(card: any) {
    this.selectedCard.set(card);
    this.showModal.set(true);
  }
}