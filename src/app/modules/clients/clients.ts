import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.html'
})

export class Clients {
  searchQuery = signal('');
  selectedClient = signal<any | null>(null);
  showModal = signal(false);

  allClients = signal<any[]>([
    {
      id: 1,
      name: 'Condomínio Solar das Palmeiras',
      status: 'Ativo',
      description: 'Condomínio residencial com 24 blocos. Acesso principal pela Rua das Flores.',
      cameras: [
        { name: 'Portaria Principal', status: 'Online' },
        { name: 'Entrada Garagem', status: 'Offline', issue: 'Sem sinal de vídeo' }
      ],
      openCards: [{ id: 'CRD-001', title: 'Manutenção Câmera 02', priority: 'Média' }],
      operationLog: [{ date: '24/04/2026 22:10', event: 'Ronda virtual concluída sem alterações.' }]
    },
    {
      id: 2,
      name: 'Supermercado Central',
      status: 'Ativo',
      description: 'Estabelecimento comercial com monitoramento 24h em áreas de carga e descarga.',
      cameras: [{ name: 'Frente de Caixa 01', status: 'Online' }],
      openCards: [],
      operationLog: [{ date: '24/04/2026 19:30', event: 'Acesso não autorizado detectado na doca 4.' }]
    }
  ]);

  filteredClients = computed(() => {
    return this.allClients().filter(c => 
      c.name.toLowerCase().includes(this.searchQuery().toLowerCase())
    );
  });

  openClientDetails(client: any) {
    this.selectedClient.set(client);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedClient.set(null);
  }
}