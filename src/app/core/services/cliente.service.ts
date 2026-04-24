import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { MOCK_CLIENTES } from '../../../constants/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientes = new BehaviorSubject<Cliente[]>(MOCK_CLIENTES);
  private selectedClient = new BehaviorSubject<Cliente | null>(null);

  clientes$ = this.clientes.asObservable();
  selectedClient$ = this.selectedClient.asObservable();

  constructor() {}

  getClientes(): Observable<Cliente[]> {
    return this.clientes$.pipe(delay(300));
  }

  getClienteById(id: string): Observable<Cliente | undefined> {
    return of(this.clientes.value.find(c => c.id === id)).pipe(delay(200));
  }

  searchClientes(termo: string): Observable<Cliente[]> {
    if (!termo.trim()) {
      return this.getClientes();
    }

    const resultado = this.clientes.value.filter(c =>
      c.nome.toLowerCase().includes(termo.toLowerCase()) ||
      c.email.toLowerCase().includes(termo.toLowerCase()) ||
      c.telefone.includes(termo)
    );

    return of(resultado).pipe(delay(200));
  }

  selectClient(cliente: Cliente): void {
    this.selectedClient.next(cliente);
  }

  getSelectedClient(): Cliente | null {
    return this.selectedClient.value;
  }

  addCliente(cliente: Omit<Cliente, 'id' | 'criadoEm' | 'atualizadoEm'>): Observable<Cliente> {
    const novoCliente: Cliente = {
      ...cliente,
      id: this.generateId(),
      criadoEm: new Date(),
      atualizadoEm: new Date()
    };

    const clientesAtualizados = [...this.clientes.value, novoCliente];
    this.clientes.next(clientesAtualizados);

    return of(novoCliente).pipe(delay(300));
  }

  updateCliente(id: string, dados: Partial<Cliente>): Observable<Cliente | null> {
    const clientesAtualizados = this.clientes.value.map(c =>
      c.id === id
        ? {
            ...c,
            ...dados,
            id: c.id,
            criadoEm: c.criadoEm,
            atualizadoEm: new Date()
          }
        : c
    );

    const clienteAtualizado = clientesAtualizados.find(c => c.id === id) || null;
    this.clientes.next(clientesAtualizados);

    if (this.selectedClient.value?.id === id && clienteAtualizado) {
      this.selectedClient.next(clienteAtualizado);
    }

    return of(clienteAtualizado).pipe(delay(300));
  }

  deleteCliente(id: string): Observable<boolean> {
    const clientesAtualizados = this.clientes.value.filter(c => c.id !== id);
    this.clientes.next(clientesAtualizados);

    if (this.selectedClient.value?.id === id) {
      this.selectedClient.next(null);
    }

    return of(true).pipe(delay(300));
  }

  private generateId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
