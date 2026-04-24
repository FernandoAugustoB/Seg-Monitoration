import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { Camera } from '../models/camera.model';
import { MOCK_CAMERAS } from '../../../constants/mock-data';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private cameras = new BehaviorSubject<Camera[]>(MOCK_CAMERAS);

  cameras$ = this.cameras.asObservable();

  constructor() {}

  getCameras(): Observable<Camera[]> {
    return this.cameras$.pipe(delay(300));
  }

  getCamerasByCliente(clienteId: string): Observable<Camera[]> {
    const resultado = this.cameras.value.filter(c => c.clienteId === clienteId);
    return of(resultado).pipe(delay(200));
  }

  getCameraById(id: string): Observable<Camera | undefined> {
    return of(this.cameras.value.find(c => c.id === id)).pipe(delay(200));
  }

  searchCameras(termo: string, clienteId?: string): Observable<Camera[]> {
    let resultado = this.cameras.value;

    if (clienteId) {
      resultado = resultado.filter(c => c.clienteId === clienteId);
    }

    if (termo.trim()) {
      resultado = resultado.filter(c =>
        c.nome.toLowerCase().includes(termo.toLowerCase()) ||
        c.localizacao.toLowerCase().includes(termo.toLowerCase())
      );
    }

    return of(resultado).pipe(delay(200));
  }

  addCamera(camera: Omit<Camera, 'id' | 'criadoEm' | 'atualizadoEm'>): Observable<Camera> {
    const novaCamera: Camera = {
      ...camera,
      id: this.generateId(),
      criadoEm: new Date(),
      atualizadoEm: new Date()
    };

    const camerasAtualizadas = [...this.cameras.value, novaCamera];
    this.cameras.next(camerasAtualizadas);

    return of(novaCamera).pipe(delay(300));
  }

  updateCamera(id: string, dados: Partial<Camera>): Observable<Camera | null> {
    const camerasAtualizadas = this.cameras.value.map(c =>
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

    const cameraAtualizada = camerasAtualizadas.find(c => c.id === id) || null;
    this.cameras.next(camerasAtualizadas);

    return of(cameraAtualizada).pipe(delay(300));
  }

  deleteCamera(id: string): Observable<boolean> {
    const camerasAtualizadas = this.cameras.value.filter(c => c.id !== id);
    this.cameras.next(camerasAtualizadas);

    return of(true).pipe(delay(300));
  }

  private generateId(): string {
    return `camera_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
