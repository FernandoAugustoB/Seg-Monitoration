import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-count-cameras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './count-cameras.html'
})
export class CountCameras {
  activeTab = signal<'privado' | 'publico'>('privado');
  searchQuery = signal('');

  // Mock de dados para a contagem
  privateData = signal([
    { id: 1, location: 'Portaria Norte - Bloco A', mobile: true, pc: true, online: true },
    { id: 2, location: 'Garagem Subsolo 1', mobile: true, pc: true, online: false },
    { id: 3, location: 'Salão de Festas', mobile: false, pc: true, online: true },
  ]);

  publicData = signal([
    { id: 1, location: 'Rua das Flores - Poste 04', mobile: true, pc: true, online: true },
    { id: 2, location: 'Praça Central - PT 01', mobile: true, pc: true, online: true },
  ]);

  // Filtro dinâmico baseado na aba ativa e na pesquisa
  filteredData = computed(() => {
    const data = this.activeTab() === 'privado' ? this.privateData() : this.publicData();
    return data.filter(item => 
      item.location.toLowerCase().includes(this.searchQuery().toLowerCase())
    );
  });

  setTab(tab: 'privado' | 'publico') {
    this.activeTab.set(tab);
  }

  copyReport() {
    console.log('Relatório preparado para cópia...');
    // A função de copiar será implementada futuramente
  }
}