import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera } from '../../../core/models/camera.model';
import { Cliente } from '../../../core/models/cliente.model';
// import { CameraService } from '../../core/services/camera.service';
// import { ClienteService } from '../../core/services/cliente.service';

@Component({
  selector: 'app-cameras-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cameras-list.component.html',
  styleUrls: ['./cameras-list.component.css']
})
export class CamerasListComponent implements OnInit {
  cameras: Camera[] = [];
  clientes: Cliente[] = [];
  loading = false;
  searchTerm = '';
  selectedClienteId = '';
  selectedCamera: Camera | null = null;
  showDetails = false;

  constructor(
  ) {}

  ngOnInit(): void {
    this.loadClientes();
    this.loadCameras();
  }

  loadClientes(): void {
    // this.clienteService.getClientes().subscribe({
    //   next: (data) => {
    //     this.clientes = data;
    //   }
    // });
  }

  loadCameras(): void {
    // this.loading = true;
    // this.cameraService.getCameras().subscribe({
    //   next: (data) => {
    //     this.cameras = data;
    //     this.loading = false;
    //   }
    // });
  }

  search(): void {
    // this.loading = true;
    // this.cameraService.searchCameras(this.searchTerm, this.selectedClienteId || undefined).subscribe({
    //   next: (data) => {
    //     this.cameras = data;
    //     this.loading = false;
    //   }
    // });
  }

  selectCamera(camera: Camera): void {
    this.selectedCamera = camera;
    this.showDetails = true;
  }

  closeDetails(): void {
    this.showDetails = false;
    this.selectedCamera = null;
  }

  getStatusColor(status: string): string {
    if (status === 'online') return 'bg-green-900/30 border-green-600 text-green-400';
    if (status === 'alerta') return 'bg-yellow-900/30 border-yellow-600 text-yellow-400';
    return 'bg-red-900/30 border-red-600 text-red-400';
  }

  getStatusText(status: string): string {
    const map: { [key: string]: string } = {
      online: 'Online',
      alerta: 'Alerta',
      offline: 'Offline'
    };
    return map[status] || status;
  }

  getClienteName(clienteId: string): string {
    return this.clientes.find(c => c.id === clienteId)?.nome || 'Cliente desconhecido';
  }
}
