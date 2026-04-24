import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cameras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cameras.html'
})
export class Cameras {
  searchQuery = signal('');
  selectedClient = signal<any | null>(null);
  showModal = signal(false);

  clientsWithCameras = signal([
    {
      name: 'Condomínio Solar das Palmeiras',
      total: 12,
      online: 11,
      offline: 1,
      cameras: [
        { id: 'CAM-01', name: 'Portaria Norte', status: 'Online', lastCheck: '03:30' },
        { id: 'CAM-02', name: 'Garagem Subsolo', status: 'Offline', lastCheck: '03:15', problem: 'Perda de Pacotes/Sinal' }
      ]
    },
    {
      name: 'Supermercado Central',
      total: 8,
      online: 8,
      offline: 0,
      cameras: [
        { id: 'CAM-01', name: 'Corredor 04', status: 'Online', lastCheck: '03:35' }
      ]
    }
  ]);

  filteredClients = computed(() => {
    return this.clientsWithCameras().filter(c => 
      c.name.toLowerCase().includes(this.searchQuery().toLowerCase())
    );
  });

  openDetails(client: any) {
    this.selectedClient.set(client);
    this.showModal.set(true);
  }
}