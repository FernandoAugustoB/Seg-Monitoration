import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../core/models/cliente.model';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  clientes: Cliente[] = [];
  loading = false;
  searchTerm = '';
  selectedClient: Cliente | null = null;
  showDetails = false;

  constructor() {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.loading = true;
    // this.clienteService.getClientes().subscribe({
    //   next: (data) => {
    //     this.clientes = data;
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     console.error('Erro ao carregar clientes:', err);
    //     this.loading = false;
    //   }
    // });
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.loadClientes();
      return;
    }

    this.loading = true;
    // this.clienteService.searchClientes(this.searchTerm).subscribe({
    //   next: (data) => {
    //     this.clientes = data;
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     console.error('Erro na busca:', err);
    //     this.loading = false;
    //   }
    // });
  }

  selectClient(cliente: Cliente): void {
    this.selectedClient = cliente;
    // this.clienteService.selectClient(cliente);
    this.showDetails = true;
  }

  closeDetails(): void {
    this.showDetails = false;
    this.selectedClient = null;
  }

  getStatusColor(status: string): string {
    if (status === 'active') return 'bg-green-900/30 border-green-600 text-green-400';
    return 'bg-red-900/30 border-red-600 text-red-400';
  }

  getStatusText(status: string): string {
    return status === 'active' ? 'Ativo' : 'Inativo';
  }
}
